// I added a column of colors by region to the data file - manually
// The objective is to graph of obesity % vs smoking %
// Color code is 
//      blue = northeast 
//      green = mid-Atlantic
//      red = southeast
//      yellow = midwest 
//      orange = southwest 
//      purple = west


// Read the data from the csv file and print to console
// I stored the file in the github.io server to be able to read, since I was
// having trouble with using a local server for this and to test the page.

d3.csv("https://RandallStevenson.github.io/data.csv").then(function(statedata) {
        console.log(statedata);

// log a list of state abbreviations
var abbr=statedata.map(data => data.abbr);
console.log("State abbreviations: ",abbr);

// log a list of region colors, smokers and obesity
var regions=statedata.map(data => data.region);
console.log("Regional colors: ",regions);

// log a list of % smokers as numbers
var smoker=statedata.map(data => +data.smokes);
console.log("Smokers: ",smoker);

// log a list of % obesity as numbers
var obese=statedata.map(data => +data.obesity);
console.log("Obesity: ",obese);
});

var svgWidth=700;
var svgHeight=700;

// set multiplier to 10 for cx and cy to fit on graph, 
// because all percentages are between 9 and 50

var scale=10;

// obseity rates range from 21-36%
var yScale=d3.scaleLinear()
    .domain([20,40])
    .range([100,700])
// will need to multiply the obsiety rates by 300 and add 100 to scale ys

// smoking rates range from 9-27%    
var xScale=d3.scaleLinear()
    .domain([0,30])
    .range([100,700])
// will need to multiply the smoking rates by 200 and add 100 to scale xs


function printpoint(x,y,c,a) {

};


var yAxis=d3.axisLeft(yScale);
var xAxis=d3.axisBottom(xScale);
    
//var svg=d3
//    .select("body")
//    .append("svg")
//    .attr("height", svgHeight)
//    .attr("width", svgWidth);

// this was modified from information on stackoverflow

var cirle=elemEnter.append("circle")
    .attr("r",10)
    // color the circles based on the region they are in
    .attr("fill",function(d){return d.region})
    .attr("cx",function(d){return 50+10*(+d.smokes)})
    .attr("cy",function(d){return 50+10*(+d.obesity)});

elemEnter.append("text")
.attr("dx", function(d){return -5})
.text(function(d){return d.abbr})
