function dataV() {
	// practice
	// d3.select();
	// d3.selectAll();

	// d3.select('h1').style('color', 'red')
	// .attr('class', 'heading')
	// .text('Updated h1 tag')

	// d3.select('body').append("p").text('valami')
	// d3.select('body').append("p").text('vala85mi')
	// d3.select('body').append("p").text('valamcvbdfi')
	// d3.select('body').append("p").text('v518alami')

	// d3.selectAll("p").style('color', 'blue')
	// const dataset = [1,2,3,4,5,6,7,8];

	// d3.select('body')
	//     .selectAll('p')
	//     .data(dataset)
	//     .enter()
	//     .append('p')
	//     //.text('D3 is awesome!!');
	//     .text((d)=> {return d;})
	//-----------------------------------------------------------------------

	// set margin and screen sizes
	let margin = { top: 20, right: 20, bottom: 30, left: 50 },
		width = 1400 - margin.left - margin.right,
		height = 750 - margin.top - margin.bottom;

	// let dataY = [0, 180];
	// let dataX = [0, 1000];

	// set domain
    let x = d3.scaleLinear()
    //.domain(dataX)
    .range([0, width]);

	let y = d3
		.scaleLinear()
		//.domain([0, d3.max(dataY)])
		.range([height, 0]);

	// definition of axis lines
	let scaleLine = d3
		.line()
		.x((d) => {
			return x(d.gameNumber);
		})
		.y((d) => {
			return y(d.gameLength);
		});

	// append an svg element to the body
	// we add an "g" element to the svg
	// this the "g" element is placed in the upper left margin
	let svg = d3
		.select("body")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// receives the data
	d3.csv("snakes.csv", (error, data) => {
		if (error) return error;
		// we format the data using forEach
		data.forEach((d) => {
			d.gameNumber = d.gameNumber;
			d.gameLength = +d.gameLength;
		});

		// Scale the range of the data
		x.domain(
			d3.extent(data, (d) => {
				return d.gameNumber;
			}),
		);
		y.domain([
			0,
			d3.max(data, (d) => {
				return d.gameLength;
			}),
		]);

		
		svg.append("path").data([data]).attr("class", "line").attr("d", scaleLine);

		// add x axis
		svg
			.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		// add y axis
		svg.append("g").call(d3.axisLeft(y));
	});
}

window.addEventListener("load", dataV);


