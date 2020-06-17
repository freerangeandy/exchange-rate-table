const API_KEY='e5baf86a22f226eda22c4226'
const EXCHANGERATE_URL = 'https://v6.exchangerate-api.com/v6/'

const currencyTable = document.getElementById("currency-table")

const createCells = (currencyCodes) => {
  currencyCodes.forEach((code, i) => {
    const currencyLabel = document.createElement("h4")
    const currencyLabelText = document.createTextNode(code)
    currencyLabel.appendChild(currencyLabelText)
    const currencyRate = document.createElement("p")
    const currencyRateText = document.createTextNode("1.0")
    currencyRate.appendChild(currencyRateText)
    currencyRate.id =`${code}-cell-value`

    const currencyDiv = document.createElement("div")
    currencyDiv.appendChild(currencyLabel)
    currencyDiv.appendChild(currencyRate)
    currencyDiv.className = "currency-cell"
    currencyDiv.id = `${code}-cell`
    currencyDiv.addEventListener("click", getClickHandler(code))
    currencyTable.appendChild(currencyDiv)
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
    }
  })
}

loadCurrencies()

const updateRates = (currencyCode) => {
  fetch()
}

const getClickHandler = (currencyCode) => {
  return (event) => {
    const previousSelected = currencyTable.querySelector('.selected-cell')
    if (previousSelected) previousSelected.className = 'currency-cell'
    const currencyCell = document.getElementById(`${currencyCode}-cell`)
    currencyCell.className = 'selected-cell'
    console.log(currencyCode + " was clicked")
    // updateRates(currencyCode)
  }
}
