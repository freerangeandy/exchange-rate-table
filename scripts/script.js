const OPEN_EXCHANGERATE_URL = 'https://open.exchangerate-api.com/v6/'

const currencyTable = document.getElementById("currency-table")
const hiddenRateList = document.getElementById("hidden-rates")

const createCells = (currencyCodes) => {
  currencyCodes.forEach((code, i) => {
    const currencyLabel = document.createElement("h4")
    currencyLabel.innerHTML = code
    const currencyRate = document.createElement("p")
    currencyRate.innerHTML = "0.00"
    currencyRate.id = `${code}-cell-value`

    const currencyDiv = document.createElement("div")
    currencyDiv.appendChild(currencyLabel)
    currencyDiv.appendChild(currencyRate)
    currencyDiv.className = "currency-cell"
    currencyDiv.id = `${code}-cell`
    currencyDiv.addEventListener("click", getClickHandler(code))
    currencyTable.appendChild(currencyDiv)

    const hiddenRateItem = document.createElement("li")
    hiddenRateItem.className = "hidden-item"
    hiddenRateItem.id = `${code}`
    hiddenRateList.appendChild(hiddenRateItem)
  });
}

const loadCurrencies = () => {
  fetch(`${OPEN_EXCHANGERATE_URL}latest`)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return { error: 'something went wrong'}
    }
  })
  .then(exchangeData => {
    if (!exchangeData.error) {
      const currencyCodes = Object.keys(exchangeData.rates)
      createCells(currencyCodes)
      loadRates(exchangeData.rates)
      displayNewRates(exchangeData.rates, '')
    }
  })
}

const loadRates = (conversionRates) => {
  Object.entries(conversionRates).forEach(([code, rate]) => {
    console.log(`${code}: ${rate}`)
    const hiddenRateItem = document.getElementById(`${code}`)
    hiddenRateItem.innerHTML = rate
  });
}

const updateDisplayRates = (baseCode, baseMultiplier) => {
  const otherCurrencyListItems = Array.from(document.getElementsByClassName("hidden-item"))
  let newCurrencyRates = {}
  const baseRate = document.getElementById(baseCode).innerHTML
  otherCurrencyListItems.forEach(node => {
    const otherCode = node.id
    const newRate = parseFloat(node.innerHTML) / parseFloat(baseRate)
    newCurrencyRates[node.id] = newRate * parseFloat(baseMultiplier)
  })
  displayNewRates(newCurrencyRates, baseCode)
}

const displayNewRates = (allCurrencyRates, baseCode) => {
  Object.entries(allCurrencyRates).forEach(([code, rate]) => {
    if (code != baseCode) {
      const currencyRate = document.getElementById(`${code}-cell-value`)
      currencyRate.innerHTML = rate.toFixed(3)
    }
  })
}

const getClickHandler = (currencyCode) => {
  return (event) => {
    const currencyCell = document.getElementById(`${currencyCode}-cell`)
    if (currencyCell.className !== 'selected-cell') {
      revertPreviousSelection()
      const currencyCell = document.getElementById(`${currencyCode}-cell`)
      currencyCell.className = 'selected-cell'
      const cellChildren = currencyCell.childNodes

      if (cellChildren.length >= 2){
        const baseInput = createBaseInput(currencyCode)
        currencyCell.removeChild(cellChildren[1])
        currencyCell.appendChild(baseInput)
      }
    }
    const baseMultiplier = getMultiplier()
    updateDisplayRates(currencyCode, baseMultiplier)
  }
}

const revertPreviousSelection = () => {
    const previousSelected = currencyTable.querySelector('.selected-cell')
    if (previousSelected) {
      const baseInput = document.getElementById('base-input')
      previousSelected.removeChild(baseInput)
      previousSelected.className = 'currency-cell'
      const currencyRate = document.createElement("p")
      const currencyRateText = document.createTextNode("")
      currencyRate.appendChild(currencyRateText)
      const code = previousSelected.firstChild.innerHTML
      currencyRate.id = `${code}-cell-value`
      previousSelected.appendChild(currencyRate)
    }
}

const createBaseInput = (baseCode) => {
  const typeAttr = document.createAttribute("type")
  typeAttr.value = "number"
  const minValueAttr = document.createAttribute("min")
  minValueAttr.value = 1

  const inputNode = document.createElement("input")
  inputNode.setAttributeNode(typeAttr)
  inputNode.setAttributeNode(minValueAttr)
  inputNode.id = 'base-input'
  inputNode.className = 'base-input'
  inputNode.value = 1
  inputNode.addEventListener("change", () => updateDisplayRates(baseCode, inputNode.value))
  return inputNode
}

const getMultiplier = () => {
  const multiplierNode = document.getElementById('base-input')
  if (!multiplierNode || parseFloat(multiplierNode) === NaN) return 1
  return multiplierNode.value
}

loadCurrencies()
