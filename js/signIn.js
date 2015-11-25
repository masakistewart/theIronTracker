$('document').ready(function(){
	var localStorageGET = localStorage.getItem('user');
	var localStorageOBJ = JSON.parse(localStorageGET);
	var name = localStorageOBJ.name;


	$('#logIn').on('click', function(){
		if($('#userName').val() === name){
			console.log('success');
			window.location.href = 'profile.html';
		} else {
			$('#Error').append('<p class="text-danger">Username not found!</p>');
			$('p').fadeOut(900);
		}
	});
})
