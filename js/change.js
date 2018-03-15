function changePass(formulario) {
	var password = formulario.pass1.value;
	
	if (password != formulario.pass2.value) {
		error("Error! Las contraseñas no coinciden");
		return false;
	}
	
	var datos = {"username": getCookie("user"), "pass":password ,"func": "modifyPass"};
	$.ajax({
	   type : 'POST',
	   url  : 'php/session.php',
	   data : datos,
	   success :  function(response) {
		   if(response == "true") {	correct("Operacion realizada correctamente", "start");	 }
	   }
	});
}

function correct(msg, dir) {
	$("#Error").css('color', 'green');
	$("#Error").text(msg);
	$("#main").effect("highlight");
				var audioElement = document.createElement('audio');
					audioElement.setAttribute('src', 'sounds/correct.wav');
					audioElement.setAttribute('autoplay', 'autoplay');

				$.get();

				audioElement.addEventListener("load", function() {
					audioElement.play();
				}, true);
				if (dir != 0) {
					setTimeout( function() {
						redirigir(dir, "null");
					}, 2000);
				}
}

function error(msg) {
	$("#Error").css('color', 'red');
	$("#Error").text(msg);
	$("#main").effect("shake");
				var audioElement = document.createElement('audio');
					audioElement.setAttribute('src', 'sounds/fail.wav');
					audioElement.setAttribute('autoplay', 'autoplay');

				$.get();

				audioElement.addEventListener("load", function() {
					audioElement.play();
				}, true);
}

function redirigir(id, type) {
	
		if (id == "start")
			$("#content").load("home.html");
		else if (id == "profile")
			$("#content").load("myprofile.html");
		else if (id == "as")
			$("#content").load("asignatures.html");
		else if (id == "pr")
			$("#content").load("teachers.html");
		else if (id == "al")
			$("#content").load("alumnos.html");
		else if (id == "ca")
			$("#content").load("califications.html");
		
}

