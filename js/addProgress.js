$('document').ready(function() {
	// local storage usage stuffs
	var localStorageGET = localStorage.getItem('user');
	var localOBJ = JSON.parse(localStorageGET);
	var goalType = localOBJ.goalType
	// The date Setting.
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
 	var newdate = year + "-" + month + "-" + day[1];
 	$('input[type=date]').attr('min', newdate);
 	var currentTitle;

 	for(var i = 0; i < localOBJ.goals.length; i++) {
 		if (localOBJ.goals[i].goalType === 'weight' || localOBJ.goals[i].goalType === 'max') {
 			var tmp = $('<li id="' + localOBJ.goals[i].goalType + '"><button id="' + localOBJ.goals[i].target + '" class="btn btn-danger">'+localOBJ.goals[i].title+'</button></li>');
 		} else {
 			var tmp = $('<li id="' + localOBJ.goals[i].goalType + '"><button id="' + localOBJ.goals[i].target + " miles in " + localOBJ.goals[i].target2 + '" class="btn btn-danger">'+localOBJ.goals[i].title+'</button></li>');
	 	}
	 	tmp.on('click', picker);
	 	$('.goalMenu').append(tmp);
 	}


 	//checking goal type and producing the corresponding forms.
 	//NEED TO ADD: a way of selecting which goal to update

	function picker() {
		$(".goalMenu").slideUp();
		currentTitle = $(this).text();
		var goalTarget = $(this).children()[0].id;
		$('#goalTarget').append('Goal: ' + goalTarget);
		console.log(goalTarget);
		if($(this)[0].id === 'weight'){
			$('.weight').css('display', 'block');
			$('#updateWeight').on('click', function(){
				var currentAmount = $('#weightVal').val();
				var currentDate = $('#weightDate').val();
				for (var i = 0; i < localOBJ.goals.length; i++) {
					for(var key in localOBJ.goals[i]){
						if (key === 'title' && localOBJ.goals[i][key] === currentTitle) {
							for(var prop in localOBJ.goals[i]) {
								if(prop === 'goalHistory') {
									localOBJ.goals[i][prop].push({current: currentAmount, currentDate: currentDate});
								}
							}
						};
					}
				};
				localStorage.setItem('user', JSON.stringify(localOBJ));
				window.location.href = "profile.html";
			})
		} else if ($(this)[0].id === 'max'){
			$('.max').css('display', 'block');
			$('#updateMax').on('click', function(){
				var currentAmount = $('#maxVal').val();
				var currentDate = $('#maxDate').val();
				var title = $('#maxTitle').val()
				for (var i = 0; i < localOBJ.goals.length; i++) {
					for(var key in localOBJ.goals[i]){
						if (key === 'title' && localOBJ.goals[i][key] === currentTitle) {
							for(var prop in localOBJ.goals[i]) {
								if(prop === 'goalHistory') {
									localOBJ.goals[i][prop].push({current: currentAmount, currentDate: currentDate});
								}
							}
						};
					}
				};
				localStorage.setItem('user', JSON.stringify(localOBJ));
				window.location.href = "profile.html";
			})
		} else if ($(this)[0].id === 'distance') {
			$('.distance').css('display', 'block');
			$('#updateDistance').on('click', function(){
				var currentAmount = $('#timeVal').val();
				var currentDate = $('#dotDate').val();
				for (var i = 0; i < localOBJ.goals.length; i++) {
					for(var key in localOBJ.goals[i]){
						if (key === 'title' && localOBJ.goals[i][key] === currentTitle) {
							$("#setDistance").text(localOBJ.goals[i].distance);
							for(var prop in localOBJ.goals[i]) {
								if(prop === 'goalHistory') {
									localOBJ.goals[i][prop].push({current: currentAmount, currentDate: currentDate});
								}
							}
						};
					}
				};
				localStorage.setItem('user', JSON.stringify(localOBJ));
				window.location.href = "profile.html";
			})
		}
	}
})