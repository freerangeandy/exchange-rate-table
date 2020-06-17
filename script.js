const API_KEY='e5baf86a22f226eda22c4226'
const EXCHANGERATE_URL = 'https://v6.exchangerate-api.com/v6/'

const currencyTable = document.getElementById("currency-table")
const hiddenRateList = document.getElementById("hidden-rates")

const createCells = (currencyCodes) => {
  currencyCodes.forEach((code, i) => {
    const currencyLabel = document.createElement("h4")
    const currencyLabelText = document.createTextNode(code)
    currencyLabel.appendChild(currencyLabelText)
    const currencyRate = document.createElement("p")
    const currencyRateText = document.createTextNode("0.00")
    currencyRate.appendChild(currencyRateText)
    currencyRate.id = `${code}-cell-value`

    const currencyDiv = document.createElement("div")
    currencyDiv.appendChild(currencyLabel)
    currencyDiv.appendChild(currencyRate)
    currencyDiv.className = "currency-cell"
    currencyDiv.id = `${code}-cell`
    currencyDiv.addEventListener("click", getClickHandler(code))
    currencyTable.appendChild(currencyDiv)

    const hiddenRateItem = document.createElement("li")
    hiddenRateItem.id = `${code}`
    hiddenRateList.appendChild(hiddenRateItem)
  });
}


const loadCurrencies = () => {
  fetch(`${EXCHANGERATE_URL}${API_KEY}/latest/USD`)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return { error: 'something went wrong'}
    }
  })
  .then(exchangeData => {
    if (!exchangeData.error) {
      const currencyCodes = Object.keys(exchangeData.conversion_rates)
      createCells(currencyCodes)
      loadRates(exchangeData.conversion_rates)
    }
  })
}

const loadRates = (conversionRates) => {
  Object.entries(conversionRates).forEach(([code, rate], i) => {
    console.log(`${code}: ${rate}`)
    const hiddenRateItem = document.getElementById(`${code}`)
    hiddenRateItem.innerHTML = rate
  });

}

const updateDisplayRates = (currencyCode) => {
  // const
}

const getClickHandler = (currencyCode) => {
  return (event) => {
    const previousSelected = currencyTable.querySelector('.selected-cell')
    if (previousSelected) previousSelected.className = 'currency-cell'
    const currencyCell = document.getElementById(`${currencyCode}-cell`)
    currencyCell.className = 'selected-cell'
    const currencyCellRate = document.getElementById(`${currencyCode}-cell-value`)
    currencyCellRate.innerHTML = "1.00"
    // console.log(currencyCode + " was clicked")
    // updateDisplayRates(currencyCode)
  }
}

loadCurrencies()
