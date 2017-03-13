// // Import MySQL connection.
// var Highcharts = require('highcharts');

// // Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);

$.ajax({
	url: '/applicants',
	method: 'GET'
}).done(function(data){
	console.log(data);
	
	// Create the chart
	var chart = Highcharts.chart('container', { /*Highcharts options*/      
	        chart: {
	            type: 'bar'
	        },

	        title: {
	            text: 'Fruit Consumption'
	        },
	        xAxis: {
	            categories: ['Apples', 'Bananas', 'Oranges']
	        },
	        yAxis: {
	            title: {
	                text: 'Fruit eaten'
	            }
	        },
	        series: [{
	            name: 'Jane',
	            data: [1, 0, 4]
	        }, {
	            name: 'John',
	            data: [5, 7, 3]
	        }], 
	});

});
