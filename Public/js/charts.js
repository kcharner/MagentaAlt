$.ajax({
	url: '/applicants',
	method: 'GET'
}).done(function(data){
	console.log(data);
	//Hold the categories for the graph - Different Contracts
	var categories = [];
	//Hold the values with the Total applicants by contract
	var dataCat = {data: []};
	//Go over the first set of data that contains the Total applicants by Contract
	for (var i = 0; i < data[0][0].length; i++) {
		categories.push(data[0][0][i].contract);
		dataCat.data.push(data[0][0][i].total_contract);
		console.log(dataCat.data);

	}
	
	//Chart that shows the total applicants by contract 
	Highcharts.chart('container', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Total Applicants by Contract'
	    },
	    xAxis: {
	        categories: categories,
	        title: {
	            text: 'Contracts'
	        }
	    },
	    series: [dataCat]
	});

	//Go over the second set of data that contains the total applicants by position
	var positions = [];
	var dataPos = [];
	var dataPos = {
	    name: '',
	    data: []
	};

		// categories.push(data[0][0][i].contract);
		// dataCat.data.push(data[0][0][i].total_contract);
		// console.log(dataCat.data);

	for (var i = 0; i < data[1][0].length; i++) {
		positions.push(data[1][0][i].position);
		dataPos.name = data[1][0][i].position;
		dataPos.data.push(data[1][0][i].total_position);
		console.log(dataPos);
		// pos.push(dataPos);
	}
	//Chart that shows the total applicants by contract 
	Highcharts.chart('container', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Total Applicants by Position'
	    },
	    xAxis: {
	        categories: categories,
	        title: {
	            text: 'Contracts'
	        }
	    },
	    series: [dataCat]
	});
});