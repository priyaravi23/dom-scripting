var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = 800 - margin.left - margin.right;
var height = 665 - margin.top - margin.bottom;

var svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

d3.json('./data.json', function (err, data) {
    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.expectancy))
        .range([height, 0])
        .nice();

    var yAxis = d3.axisLeft(yScale)
        .ticks(5);
    svg.call(yAxis);

    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.cost))
        .range([0, width])
        .nice();

    var xAxis = d3.axisBottom(xScale)
        .ticks(5);

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    var rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.population)])
        .range([0, 40]);

    var circles = svg
        .selectAll('.ball')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'ball')
        .attr('fill', d => {
            return (d.x > 2000) ? '#F14383' : '#E89436'
        })
        .attr('transform', d => {
            return `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`;
        });

    circles
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', d => rScale(d.population));

    circles
        .append('text')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('y', 4)
        .text(d => d.code);

});
