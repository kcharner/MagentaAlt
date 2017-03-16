
	// Submit button that displays all data assocaite with the chosen applicants application process
	$("#searchApplicant").on("click", function(event){
		event.preventDefault();
		// Why does this need to be held as an object variable?
		var applicantSelected = { email: $("#email").val().trim()
		}
		console.log(applicantSelected);

	// This post request displays the status of each process in the applicant_process table
	$.post("/viewProcess", applicantSelected, function(data){
		console.log(data[0])
		var name = data[0].first_name + " " + data[0].last_name;
		var appDate = "Application Date: " + data[0].applied;

		$("#applicantName").append(name);
		$("#applied").append(appDate);

		$.each( data[0], function( key, value ) {
		  console.log( key + ": " + value );

		  // This if statement displays applicant process information as a pending animation if data has yet to be entered into the application_process table
		
		if (value == null){
				// var row = $("<div class='container'>")
				var results = $("<div>")
				var cellName = $("<div class='col-md-2'>")
				var cellValue = $("<div class='col-md-2'>")
		  	var spinCircle = $("<div class='spinner circles'>")

				  for(var i = 0; i < 8; i++){
				  	var spinHold = $("<div>")
				  	spinCircle.append(spinHold)
				  }
				  cellName.append(key)
				  cellValue.append(spinCircle)
				  results.append(cellName)
				  results.append(cellValue)
				  $("tbody").append(results)
		  }
		  // This if statements displays applicant process information as an animated drawn check if data has been updated in the application_process table already
		  // else if(){
		  // 	var drawnCheck = $("<canvas height='160'/>")
		  // 	$("#applicantResults").append(drawnCheck)

		  // }


		//   var start = 100;
		// 	var mid = 145;
		// 	var end = 250;
		// 	var width = 20;
		// 	var leftX = start;
		// 	var leftY = start;
		// 	var rightX = mid - (width / 2.7);
		// 	var rightY = mid + (width / 2.7);
		// 	var animationSpeed = 20;

		// 	var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
		// 	ctx.lineWidth = width;
		// 	ctx.strokeStyle = 'rgba(0, 150, 0, 1)';

		// 	for (i = start; i < mid; i++) {
		// 	  var drawLeft = window.setTimeout(function() {
		// 	    ctx.beginPath();
		// 	    ctx.moveTo(start, start);
		// 	    ctx.lineTo(leftX, leftY);
		// 	    ctx.stroke();
		// 	    leftX++;
		// 	    leftY++;
		// 	  }, 1 + (i * animationSpeed) / 3);
		// 	}

		// 	for (i = mid; i < end; i++) {
		// 	  var drawRight = window.setTimeout(function() {
		// 	    ctx.beginPath();
		// 	    ctx.moveTo(leftX, leftY);
		// 	    ctx.lineTo(rightX, rightY);
		// 	    ctx.stroke();
		// 	    rightX++;
		// 	    rightY--;
		// 	  }, 1 + (i * animationSpeed) / 3);
		// 	}
		// });
		
	// Insert for loop function that loops through the data object and replaces values equal to null with a pending sign animation
			// var drawnCheck;
			// if(data[0].fp_appt != null){
			// 		drawnCheck = $("<canvas height='160'/>")
					
			// 		$("#applicantResults").append(drawnCheck)
			// 	}
			// if(data[0].fp_background_approval != null){
			// 		 drawnCheck = $("<canvas height='160'/>")
					
			// 		$("#applicantResults").append(drawnCheck)
			// 	}
		})
	})
});

	// Edit Applicant button pulls up the modal which allows the user to edit the applicant's applicant process
	$("#editApplicant").on("click", function(event){
		event.preventDefault();
		// Why does this need to be held as an object variable?
		var applicantSelected = { email: $("#email").val().trim()
		}
		console.log(applicantSelected);

		// This post request displays application process information that is complete and information that is available to edit
		$.post("/viewProcess", applicantSelected, function(data){
			console.log(data)
			$("#myModalLabel").html(data[0].first_name +  " " + data[0].last_name)
			$("#applicantID").attr("value", data[0].id)
			});
		});


	// $("#updateBtn").on("click", function(event){


	$("#orange_tag").on('change', function() {
  	if ($(this).is(':checked')) {
    $(this).attr('value', 1);
  		} else {
    $(this).attr('value', 0);
  		}
  console.log($(this).val())
  	// $('#orange_tag').text($('#orange_tag-value').val());
	});

	$("#side_result").on('change', function() {
  	if ($(this).is(':checked')) {
    $(this).attr('value', 1);
  		} else {
    $(this).attr('value', 0);
  		}
  
	});

		$("#receive_id").on('change', function() {
  	if ($(this).is(':checked')) {
    $(this).attr('value', 1);
  		} else {
    $(this).attr('value', 0);
  		}
	});
