var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = 400 - margin.left - margin.right;
var height = 565 - margin.top - margin.bottom;

var svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.json('./data.json', function (err, data) {

    var parseTime = d3.timeParse('%Y/%m/%d');

    data.forEach(company => {
        company.values.forEach(d => {
            d.date = parseTime(d.date);
            d.close = +d.close;
        });
    });

    var xScale = d3.scaleTime()
        .domain([
            d3.min(data, co => d3.min(co.values, d => d.date)),
            d3.max(data, co => d3.max(co.values, d => d.date))
        ])
        .range([0, width])
        .clamp(true);

    let xAxis = d3.axisBottom(xScale).ticks(5);

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    var yScale = d3.scaleLinear()
        .domain([
            d3.min(data, co => d3.min(co.values, d => d.close)),
            d3.max(data, co => d3.max(co.values, d => d.close))
        ])
        .range([height, 0])
        .clamp(true);

    let yAxis = d3.axisLeft(yScale);

    svg
        .append('g')
        .call(yAxis);

    var line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5));

    var area = d3.area()
        .x(d => xScale(d.date))
        .y0(yScale(yScale.domain()[0]))
        .y1(d => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5));

    svg
        .selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => ['#CB4E7D', '#35A494'][i]);
});
