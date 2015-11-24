$('document').ready(function(){
	function pushUserToLocalStorage(obj) {
		console.log(JSON.stringify(obj), "COOOL");
		localStorage.setItem('user', JSON.stringify(obj));
	}
	var localStorageGET = localStorage.getItem('user');
	var localStorageOBJ = JSON.parse(localStorageGET);

	$('#updateAccount').on('click', function() {
		if($('#name').val() && $('#bio').val()){
			localStorageOBJ.name = $("#name").val();
			localStorageOBJ.bio = $("#bio").val();
			localStorageOBJ.image = $('#profileURL').val();
			pushUserToLocalStorage(localStorageOBJ)
			window.location.href = "profile.html"
		} else {
			$('#error').append($('<p class="error text-center text-danger">ERROR</p>'));
			$('.error').fadeOut(1000);
		}
	})
})
