document.getElementById('price-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get user input values
    var pricesInput = document.getElementById('price-input').value.trim();
    var daysInput = parseInt(document.getElementById('days-input').value.trim());
  
    // Parse historical prices
    var prices = pricesInput.split(',').map(Number);
  
    if (prices.length > 1 && daysInput > 0) {
      var forecastedPrices = forecastPrices(prices, daysInput);
      displayForecast(forecastedPrices);
    } else {
      alert('Please enter valid prices and days.');
    }
  });
  
  // Linear regression forecast (for simplicity)
  function forecastPrices(prices, days) {
    var lastPrice = prices[prices.length - 1];
    var priceChanges = [];
  
    // Calculate price changes
    for (var i = 1; i < prices.length; i++) {
      priceChanges.push(prices[i] - prices[i - 1]);
    }
  
    // Calculate average price change
    var averageChange = priceChanges.reduce((a, b) => a + b, 0) / priceChanges.length;
  
    var forecastedPrices = [];
    for (var i = 0; i < days; i++) {
      lastPrice += averageChange;  // Predict next price
      forecastedPrices.push(lastPrice.toFixed(2));  // Round to 2 decimals
    }
  
    return forecastedPrices;
  }
  
  // Display forecasted prices in the UI
  function displayForecast(forecastedPrices) {
    var forecastResults = document.getElementById('forecast-results');
    forecastResults.innerHTML = '';
  
    forecastedPrices.forEach((price, index) => {
      var li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerText = `Day ${index + 1}: $${price}`;
      forecastResults.appendChild(li);
    });
  }
  