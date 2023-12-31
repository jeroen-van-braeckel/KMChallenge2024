console.log("test");

// Get the query string from the URL
const queryString = window.location.search;

// Remove the leading "?" and split the parameters
const params = queryString.substring(1).split('&');

// Create an object to store parameter key-value pairs
const paramMap = {};

// Loop through the parameters and add them to the object
for (const param of params) {
  const [key, value] = param.split('=');
  paramMap[key] = value;
}

console.log(paramMap);
// Get the value of a parameter
const param1Value = paramMap['param1'];
const param2Value = paramMap['param2'];

console.log('param1:', param1Value); // Output: value1
console.log('param2:', param2Value); // Output: value2
