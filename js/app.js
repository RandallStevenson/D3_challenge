// I chose to compare obesity to smoking and also look at them regionally

// I added a column of colors by region to the data file - manually
// The objective is to graph of obesity % vs smoking %
// Color code is 
//      blue = northeast 
//      green = mid-Atlantic
//      red = southeast
//      yellow = midwest 
//      orange = southwest 
//      purple = west

//  Intiate connection to HTML

// Much of this was modified from Youtube tutorials on d3 by Curran Kelleher

// Initial assignments of values

var svg=d3
   .select("#scatter")
   .append("svg")
   .attr("height", 700)
   .attr("width", 700)
   .classed("chart",true);

var width = +svg.attr("width");
var height = +svg.attr("height");



var render = statedata => {
    var margin={ top:50, bottom:50, left:50, right:50}

// axis labeling found in stack overflow
   // smokers range 9%-27%


   var xScale = d3.scaleLinear()
        .domain([7,28])
        .range([0,width-margin.left-margin.right]);
        
    var xAxis=d3.axisLeft(xScale)
    
    var yScale = d3.scaleLinear()
    // obesity range is 21%-36%    
        .domain([40,20])
        .range([0,height-margin.top-margin.bottom]);
    
    var yAxis=d3.axisLeft(yScale);
   
    
    var g=svg.append('g')
        .attr("transform","translate(50,50)");
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
        .attr("transform", "translate(0,600)");

    
    
    svg.append("text")
        .attr("transform","translate(350,700)")
        .attr("text-anchor", "middle")
        .text("Smokers - Percent of Population");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 50 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Obese - Percent of Population");  

// There is some type of bug in JS that does not allow the same data to be 
// read in more than once, sometimes.  Help was provided by Nelson to fix 
// this; otherwise, about 1/2 of the states abbreviations appeared.

    var newVar = svg.selectAll("circle")
        .data(statedata)
        .enter()
        newVar.append("circle")
            .attr("cx",d => xScale(d.smokes)+50)
            .attr("cy",d => yScale(d.obesity)+50)
            .attr("r",10)
            .style("fill",d => d.region);
        newVar.append("text")
            .attr("x", d => xScale(d.smokes)+42)
            .attr("y", d => yScale(d.obesity)+54)
            .style("font-size","10px")
            .style("font-weight", "bold")
            .text(d => d.abbr)
         
};






// I stored the file in the github.io server to be able to read, since I was
// having trouble with using a local server for this and to test the page.


// Read the data from the csv file and print to console
// and convert obesity and smoker to numbers, then log statedata
d3.csv("https://RandallStevenson.github.io/data.csv").then(statedata => {
    statedata.forEach(state => {
        state.obesity = +state.obesity;
        state.smokes = +state.smokes;
    })
        console.log(statedata);

        render(statedata);
});





// this was modified from information on stackoverflow

