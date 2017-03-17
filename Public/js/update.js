// Submit button that displays all data assocaite with the chosen applicants application process
	$("#searchApplicant").on("click", function(event){
		event.preventDefault();
		   $("tbody").empty();
       $("#applicantName").empty();
       $("#applied").empty()
       $("#id").empty()
		
		// Why does this need to be held as an object variable?
		var applicantSelected = { email: $("#email").val().trim()
		}
		console.log(applicantSelected);

// This post request displays the status of each process in the applicant_process table
	$.post("/viewProcess", applicantSelected, function(data){
		console.log(data[0])
		var name = data[0].first_name + " " + data[0].last_name;
		var appDate = "Application Date: " + data[0].applied;
		// appDate = STR_TO_DATE(appDate, '%m.%d.%y')
		
		var appId = "Applicant ID: " + data[0].id
		$("#applicantName").append(name);
		$("#applied").append(appDate);
		$("#id").append(appId)

// This .each method allows us to loop over the object within the database
		$.each( data[0], function( key, value, err ) {
		  // console.log( key + ": " + value );


	// This if statement displays applicant process information as a pending animation if data has yet to be entered into the application_process table
		if(key === 'fp_appt' || key === 'fp_background_approval' || key === 'orange_tag' || key === 'sida_class' || key === 'side_result' || key === 'orientation_training' || key === 'safety_training' || key === 'customer_training' || key === 'receive_id'){
			if(key === 'fp_appt'){
				key = 'Finger Print Appointment'
			}
			if(key === 'fp_background_approval'){
				key = 'Finger Print Background Approval'
			}

			var results = $("<div>");
			var cellName = $("<div class='col-md-3 process-name'>");
			var cellValue = $("<div class='col-md-1'>");
		  var spinCircle = $("<div class='loading bar'>");
		  // var drawnCheck = $("<svg width='150' height='150'/>");
		  // var canvas = $("<canvas style='color:purple;' class='canvas'>").attr("height", 100);
		  // var path = $("<path id='check' d='M10,30 130,50 195,-70'/>");
		  var imageSource = "../assets/images/checksign.jpg"
		  var image = $("<img class='img-responsive pending' height='200' width='200'/>").attr('src', imageSource)
		  // drawnCheck.append(path);
		  		// key = ""

			var keyLabel = key;
				  keyLabel = key.replace("_"," ")
			var label = keyLabel.toUpperCase();

		 if (value == null){
		
				  for(var i = 0; i < 8; i++){
				  	var spinHold = $("<div>")
				  	spinCircle.append(spinHold)
				  }
				  cellName.append(label)
				  cellValue.append(spinCircle)
				  results.append(cellName)
				  results.append(cellValue)
				  $("tbody").append(results)
		  
			}
	// This if statements displays applicant process information as an animated drawn check if data has been updated in the application_process table already
		  else {
		  			// var check = $("<div>")
		  			// drawnCheck.append(check);
		  			cellName.append(label)
				  	cellValue.append(image)
						results.append(cellName)
						results.append(cellValue)		  	
				  	$("tbody").append(results)
				}
			}
		}) // End of .each function
	}) // End of Post Request
	$("#search")[0].reset();
}) // End of submit button on click function 


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
	}); // End up edit applicant button on click function


// These three tags change the value of the checkbox in the modal form
// Since the columns in mysql associated with these inputs are boolean, we have to enter them into the database as 1 or 0 
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

// On click function is for the clear button, which specifically clears everything in the table body
$("#clr").on("click", function(event) {
        event.preventDefault();
       $("tbody").empty();
       $("#applicantName").empty();
       $("#applied").empty()
       $("#id").empty();
});
