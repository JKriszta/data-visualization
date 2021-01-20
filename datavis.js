function dataV() {
	//gyakorlás
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

	// margó és képernyő méreteinek beállítása
	let margin = { top: 20, right: 20, bottom: 30, left: 50 },
		width = 1400 - margin.left - margin.right,
		height = 750 - margin.top - margin.bottom;

	// let dataY = [0, 180];
	// let dataX = [0, 1000];

	// tartományok beállítása
    let x = d3.scaleLinear()
    //.domain(dataX)
    .range([0, width]);

	let y = d3
		.scaleLinear()
		//.domain([0, d3.max(dataY)])
		.range([height, 0]);

	// tengely vonalak meghatározása
	let scaleLine = d3
		.line()
		.x((d) => {
			return x(d.gameNumber);
		})
		.y((d) => {
			return y(d.gameLength);
		});

	// svg elem csatolása a bodyhoz
	// hozzáadunk egy "g" elemet az svg elemhez
	// ezt a "g" elemet a bal felső margóra helyezzük
	let svg = d3
		.select("body")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// megkapja az adatokat
	d3.csv("snakes.csv", (error, data) => {
		if (error) return error;
		// forEach használatával formázzuk az adatokat
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

		// hozzáadunk egy
		svg.append("path").data([data]).attr("class", "line").attr("d", scaleLine);

		// x tengely hozzáadása
		svg
			.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		// y tengely hozzáadása
		svg.append("g").call(d3.axisLeft(y));
	});
}

window.addEventListener("load", dataV);


