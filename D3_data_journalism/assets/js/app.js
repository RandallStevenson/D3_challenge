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

// Much of this was modified from Youtube tutorials on d3 by Curran Kelleher

// Initial assignments of values

var svg=d3
   .select("body")
   .append("svg")
   .attr("height", 700)
   .attr("width", 700);

var width = +svg.attr("width");
var height = +svg.attr("height");

var show = data => {
    var margin={ top:50, bottom:50, left:50, right:50}
   // rather than padding, I added about 10% to the scales 
   
   // smokers range 9%-27%
    var xScale = d3.scaleLinear()
        .domain([5,30])
        .range([0,width-margin.left-margin.right]);
    var xAxis=d3.axisLeft(xScale);

    var yScale = d3.scaleLinear()
    // obesity range is 21%-36%    
        .domain([20,40])
        .range([0,height-margin.top-margin.bottom]);
    
    var yAxis=d3.axisLeft(yScale);

    var g=svg.append('g')
    //    .attr("transform","translate(50,50)");
    //g.append('g').call(d3.axisLeft(yScale)-15);
    //g.append('g').call(d3.axisBottom(xScale)-15);

    svg.selectAll("circle")
    // statedata(statedata)
        .enter()
        .append("circle")
        .attr("cx",d => xScale(d.smokes))
        .attr("cy",d => yScale(d.obesity))
        .attr("fill",d => d.region)
        .attr("r",30)
};

// axis labeling found in stack overflow

svg.append("text")
    .attr("class","x label")
    .attr("text-anchor", "end")
    .attr("x",width)
    .attr("y", height - 6)
    .text("Smokers % of Population");

svg.append("text")
    .attr("class","y label")
    .attr("text-anchor", "end")
    .attr("y",6)
    .attr("dy", "25px")
    .text("Obesity as a % of Population");


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

        show(statedata);
});





// this was modified from information on stackoverflow

//var cirle=elemEnter.append("circle")
//    .attr("r",10)
//    .attr("fill",function(d){return d.region})
//    .attr("cx",function(d){return 50+10*(+d.smokes)})
//    .attr("cy",function(d){return 50+10*(+d.obesity)});

//elemEnter.append("text")
//.attr("dx", function(d){return -5})
//.text(function(d){return d.abbr})
