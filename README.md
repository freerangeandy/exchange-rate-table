# Exchange-Rate Table
This project was created as part of a Mintbean Careerhack (6/17) where the challenge was to make a currency exchange rate calculator. 
## Setup Instructions
This project uses client-side JavaScript in addition to a CSS stylesheet and HTML, so after you clone this project to your desktop, you only need to open the index.html file in the browser of your choice to access the site and its functionality. 

While inside a terminal window with the current working directory set to the root project folder, the command to open the site would be:

`open index.html`

## Usage
Clicking on a table cell corresponding to a currency will set it as the current "base" currency (US dollars, by default) and immediately update every other table cell to display the value of that currency equivalent to 1 unit (by default) of the base currency.

The reference value of the base currency can be increased from its default of 1 by entering (or scrolling to) any value greater than 0. The values of the other currencies in the table will update in real-time if the scrolling buttons of the input field are used. To update the table to reflect a value manually typed into the input field, however, you need to press 'Enter'.  

## Notes on the API
The data used to calculate exchange rates is freely provided by ExchangeRate-API.com, however the free exchange rate API endpoint has limitations on usage (see details at https://www.exchangerate-api.com/docs/free-exchange-rate-api).

A single request to this endpoint is sent upon loading the site, so frequent refreshing can trigger rate limitation. This can be prohibitive, but an API key is freely offered upon sign-up with ExchangeRate-API.com that allows access to an endpoint with a much higher request quota. 

If you choose to go this route and acquire an API key, these adjustments need to be made to script.js to use the other endpoint:

Line 1: Add the following lines
```
const API_KEY='[YOUR_API_KEY]'
const EXCHANGERATE_URL = 'https://v6.exchangerate-api.com/v6/'
```

Line 32: Change the following
```
fetch(`${OPEN_EXCHANGERATE_URL}latest`)
```
  to this
```
fetch(`${EXCHANGERATE_URL}${API_KEY}/latest/USD`)
```

Lines 42-45:
Change all instances of `exchangeData.rates` to be `exchangeData.conversion_rates`
