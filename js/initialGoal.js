$('document').ready(function() {
	var localStorageGET = localStorage.getItem('user');
	var localOBJ = JSON.parse(localStorageGET);
	var goalType = localOBJ.goals[0].goalType
	var tmpGoalObj = localOBJ.goals[0];

	if(goalType === 'weight'){
		$('.weight').css('display', 'block');
		$('#submitWeight').on('click', function(){
			var goalAmount = $('#weight').val();
			tmpGoalObj['target'] = goalAmount;
			tmpGoalObj['title'] = $('#weightTitle').val();
			console.log(tmpGoalObj);
			localStorage.setItem('user', JSON.stringify(localOBJ));
			window.location.href = "profile.html";
		})
	} else if (goalType === 'max'){
		$('.max').css('display', 'block');
		$('#submitMax').on('click', function(){
			var goalAmount = $('#max').val();
			tmpGoalObj['target'] = goalAmount;
			tmpGoalObj['title'] = $('#maxTitle').val()
			localStorage.setItem('user', JSON.stringify(localOBJ));
			window.location.href = "profile.html";
		})
	} else if (goalType === 'distanceOverTime') {
		$('.distance').css('display', 'block');
		$('#submitDistance').on('click', function(){
			var goalAmount = $('#distance').val();
			var goalAmount2 = $('#time').val();
			tmpGoalObj['target'] = goalAmount;
			tmpGoalObj['target2'] = goalAmount2;
			tmpGoalObj['title'] = $('#distanceTitle').val();
			localStorage.setItem('user', JSON.stringify(localOBJ));
			window.location.href = "profile.html"
		})
	}
})