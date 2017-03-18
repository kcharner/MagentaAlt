function populateContracts(contracts){
	$.each(contracts, function(key, value) {
		// console.log(value);
	     $('#contract_id')
	         .append($("<option></option>")
	         .attr("value",key)
	         .attr("data-contract",value.contract_name)
	         .text(value.contract_name));
	     $('#label_pos').hide();
	     $('#position_id').hide();
	});
}


function populatePositions(positions){
	$.each(positions, function(key, value) {
		// console.log(value.contract_name);
	     $('#position_id')
	         .append($("<option></option>")
	         .attr("value",key)
	         .attr("data-pos",value.position)
	         .text(value.position))
	         .show();
	     $('#label_pos').show();
	});
}

function renderChartByContract(data, contract){
	var appByPos = [];
	var catPos = [];
	var dataPos = {data: []};

	appByPos = data[1][0];

	//Go over the second set of data that contains the total applicants by position
	for (var i = 0; i < appByPos.length; i++) {
		console.log(appByPos[i].position + "- " + appByPos[i].contract);
		if(appByPos[i].contract == contract){
				catPos.push(appByPos[i].position);
				dataPos.data.push(appByPos[i].total_pos);
		}
	}
	//Chart that shows the total applicants by contract 
	Highcharts.chart('container2', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Total Applicants by Position'
	    },
	    xAxis: {
	        categories: catPos,
	        title: {
	            text: 'Positions'
	        }
	    },
	    yAxis: {
	    	title: {
	    		text: 'Total Applicants'
	    	}
	    },
	    legend:  {
	    	enabled: false
	    },
	    // tooltip: {
	    // 	pointFormat:'Total Applicants: {point.y}'
	    // },
	    plotOptions: {
		    column: {
		        dataLabels: {
		            enabled: true
		        },
		        enableMouseTracking: false
		    }
		},	    
    series: [dataPos]
	});

}

$.ajax({
	url: '/applicants',
	method: 'GET'
}).done(function(data){
	console.log(data);
	//Hold the information that is coig from the query at the controller using the npm package Q
	var appByContract = [];
	var positions = [];
	var contracts = [];
	//Hold the categories for the graph - Different Contracts
	var catContract = [];
	//Hold the values with the Total applicants by contract
	var dataCat = {data: []};

	appByContract = data[0][0];
	positions = data[3][0];
	contracts = data[2][0];

	// console.log(contracts);
	// console.log(positions);

	populateContracts(contracts);

	//Go over the first set of data that contains the Total applicants by Contract
	for (var i = 0; i < appByContract.length; i++) {
		catContract.push(appByContract[i].contract);
		dataCat.data.push(appByContract[i].total_contract);

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
	        categories: catContract,
	        title: {
	            text: 'Contracts'
	        }
	    },
	    yAxis: {
	    	title: {
	    		text: 'Total Applicants'
	    	}
	    },
	    legend:  {
	    	enabled: false
	    },
	    tooltip: {
	    	pointFormat:'Total Applicants: {point.y}'
	    },
	    series: [dataCat]
	});

	$('#contract_id').change(function(){
			var selectedContract = "";
			var selectedPosition = "";
			selectedContract = $(this).find("option:selected").attr("data-contract");

			// populatePositions(positions);
			renderChartByContract(data, selectedContract);


	})

});
