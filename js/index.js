$('document').ready(function(){

	$('#signInButton').on('click', function() {
		window.location.href = 'signIn.html'
		return false
	})
	$('#signUpButton').on('click', function(){
		window.location.href = 'signUp.html'
		return false
	})
})