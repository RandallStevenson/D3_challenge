// I added a column of colors by region to the data file - manually
// The objective is to graph of obesity % vs smoking %
// Color code is 
//      blue = northeast 
//      green = mid-Atlantic
//      red = southeast
//      yellow = midwest 
//      orange = southwest 
//      purple = west

// This code is modified from Activity 02 of 16.2
// Read the data from the csv file and print to console
d3.csv("./data.csv").then(function(statedata) {
        console.log(statedata);

// log a list of state abbreviations
var abbr=statedata.map(data => data.abbr);
console.log("State abbreviations: ",abbr);

// log a list of region colors
var regions=statedata.map(data => data.color)

// cast obsity and smoker
statedata.forEach(function(data) { 
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
});
}).catch(function(error) {
    console.log(error);
});

var svgWidth=500
var svgHeight=500

var svg=d3
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
