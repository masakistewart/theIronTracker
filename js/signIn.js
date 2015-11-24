$('document').ready(function(){
	var localStorageGET = localStorage.getItem('user');
	var localStorageOBJ = JSON.parse(localStorageGET);
	var name = localStorageOBJ.name;


	$('#logIn').on('click', function(){
		if($('#userName').val() === name){
			console.log('success');
			window.location.href = 'profile.html';
		} else {
			$('#signIn').append('<p class="error">Username not found!</p>');
		}
	});
})
