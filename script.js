const API_KEY='e5baf86a22f226eda22c4226'
const EXCHANGERATE_URL = 'https://v6.exchangerate-api.com/v6/'

const currencyTable = document.getElementById("currency-table")

const createCells = (currencyCodes) => {
  currencyCodes.forEach((code, i) => {
    const currencyDiv = document.createElement("div")
    const currencyLabel = document.createTextNode(code)
    currencyDiv.appendChild(currencyLabel)
    currencyDiv.className = "currency-cell"
    currencyDiv.id = code
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
    updateRates(currencyCode)
  }
}
