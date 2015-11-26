$('document').ready(function(){
	function pushUserToLocalStorage(obj) {
		console.log(JSON.stringify(obj), "COOOL");
		localStorage.setItem('user', JSON.stringify(obj));
	}
	var localStorageGET = localStorage.getItem('user');
	var localStorageOBJ = JSON.parse(localStorageGET);

	$('#updateAccount').on('click', function() {
		if($('#name').val() && $('#bio').val() && $('#profileURL').val()){
			localStorageOBJ.name = $("#name").val();
			localStorageOBJ.bio = $("#bio").val();
			localStorageOBJ.image = $('#profileURL').val();
		} else if ($('#bio').val() && $('#name').val()) {
			localStorageOBJ.bio = $("#bio").val();
			localStorageOBJ.name = $("#name").val();
		} else if ($('#profileURL').val() && $('#bio').val()){
			localStorageOBJ.image = $('#profileURL').val();
			localStorageOBJ.bio = $("#bio").val();
		} else if ( $('#name').val() && $('#profileURL').val()){
			localStorageOBJ.image = $('#profileURL').val();
			localStorageOBJ.bio = $("#bio").val();
		} else if ($('#name').val()){
			localStorageOBJ.name = $("#name").val();
		} else if ($('#bio').val()){
			localStorageOBJ.bio = $("#bio").val();
		} else if ($('#profileURL').val()){
			localStorageOBJ.image = $('#profileURL').val();
		} else {
			$('#error').append($('<p class="error text-center text-danger">ERROR</p>'));
			$('.error').fadeOut(1000);
		}
		pushUserToLocalStorage(localStorageOBJ);
		window.location.href = "profile.html";
	})
})
