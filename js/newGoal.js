$('document').ready(function() {
	var localStorageGET = localStorage.getItem('user');
	var localOBJ = JSON.parse(localStorageGET);
	var goalType = localOBJ.goalType
	$('#distanceOverTimeRadio').on('click', function(){
		$('.distance').slideDown();
		$('#radioGroup').slideUp();
	})

	$('#maxRadio').on('click', function(){
		$('.max').slideDown();
		$('#radioGroup').slideUp();
	})

	$('#weightRadio').on('click', function(){
		$('.weight').slideDown();
		$('#radioGroup').slideUp();
	})

	$('#updateDistance').on('click', setNewGoal);
	$('#updateMax').on('click', setNewGoal);
	$('#updateWeight').on('click', setNewGoal);


	function setNewGoal() {
		console.log(this.id)
		if(this.id === 'updateWeight'){
			var currentAmount = $('#weight').val();
			var title = $('#weightTitle').val()
			localOBJ.goals.push({title: title, target: currentAmount, goalType: 'weight', goalHistory: []});
		} else if (this.id === 'updateMax'){
			$('.max').css('display', 'block');
				var currentAmount = $('#max').val();
				var title = $('#maxTitle').val()
				localOBJ.goals.push({title: title, target: currentAmount, goalType: 'max', goalHistory: []})
			} else if (this.id === 'updateDistance') {
			$('.distance').css('display', 'block');
				var currentAmount = $('#distance').val();
				var targetTime = $('#time').val()
				var title = $('#distanceTitle').val();
				localOBJ.goals.push({title: title, target: currentAmount, target2: targetTime, goalType: 'distance', goalHistory: [] })

			}
		localStorage.setItem('user', JSON.stringify(localOBJ));
		window.location.href = "profile.html";
	}
})