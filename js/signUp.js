$('document').ready(function(){
	function pushUserToLocalStorage(obj) {
		console.log(JSON.stringify(obj), "COOOL");
		localStorage.setItem('user', JSON.stringify(obj));
	}

	function User(){
		this.name = $("#name").val();
		this.bio = $("#bio").val();
		this.goals = [];
		this.image = $('#profileURL').val();
		var tmpObj = {
			goalHistory: []
		};
		if($('#max')[0].checked){
			tmpObj.goalType = 'max';
			this.goals.push(tmpObj);
		} else if ($('#distanceOverTime')[0].checked){
			tmpObj.goalType = 'distanceOverTime';
			this.goals.push(tmpObj);
		} else {
			tmpObj.goalType = 'weight';
			this.goals.push(tmpObj);
		};
	}

	$('#createAccount').on('click', function(){
		if($('#name').val() && $('#bio').val()){
			USER = new User();
			pushUserToLocalStorage(USER);
			window.location.href = 'initialGoal.html';
		} else {
			$('.radio').append($('<p class="error text-center text-danger">ERROR</p>'));
			$('.error').fadeOut(1000);
		}
	});
})