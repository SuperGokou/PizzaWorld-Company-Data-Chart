/*****************************************/
/*   DRAW BAR CHART - ALREADY COMPLETE   */
/*****************************************/

// Chart area
let margin = {top: 40, right: 20, bottom: 40, left: 50},
    width = 580,
    height = 320;

let svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse date
let parseDate = d3.timeParse("%Y-%m-%d");

// Scales and axes
let x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

let y = d3.scaleLinear()
    .range([height, 0]);

let xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(d3.timeFormat("%Y-%m-%d"));

let yAxis = d3.axisLeft()
    .scale(y);

let xAxisGroup = svg.append("g")
    .attr("class", "x-axis axis");

let yAxisGroup = svg.append("g")
    .attr("class", "y-axis axis");

// Render function
function renderBarChart(data) {
    let groupedData = Array.from(d3.group(data, d => d.date), ([key, array]) => ({key: key, value: array.length}));

    groupedData.forEach(d => {
        d.key = parseDate(d.key);
        d.value = +d.value;
    });

    // Update scale domains
    x.domain(groupedData.map(d => d.key));
    y.domain([0, d3.max(groupedData, d => d.value)]);

    // Draw bars
    let bars = svg.selectAll(".bar")
        .data(groupedData);

    bars.exit().remove();

    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .merge(bars)
        .attr("x", d => x(d.key))
        .attr("y", d => y(d.value))
        .attr("height", d => (height - y(d.value)))
        .attr("width", x.bandwidth())
        .on("mouseover", function(event, d) {
            let chartArea = document.getElementById('chart-area');
            let rect = chartArea.getBoundingClientRect();
            let xPosition = event.clientX - rect.left + 15;
            let yPosition = event.clientY - rect.top - 30;

            d3.select("#tooltip")
                .style("left", xPosition + 'px')
                .style("top", yPosition + 'px')
                .select("#value")
                .text(d.value);

            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true);
        });

    // Draw axes
    xAxisGroup = svg.select(".x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    yAxisGroup = svg.select(".y-axis")
        .call(yAxis);

    svg.select("text.axis-title").remove();

    svg.append("text")
        .attr("class", "axis-title")
        .attr("x", -5)
        .attr("y", -15)
        .attr("dy", ".1em")
        .style("text-anchor", "end")
        .text("Deliveries");
}
