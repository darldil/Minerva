$(document).ready(function() {
	
	$('#main').show("scale", {percent: 100, direction: 'both', origin: ['middle','middle']},1000);  
	
	$("img").click(function() {
		$('#main').hide("scale",
        {percent: 0, direction: 'both', origin: ['middle','right']},2100);   
				$("#main").promise().done(function() {
					window.location.href = "login.html";
				});
	});
	
	$("input[id=DNI]").change(function() {
		checkDNI();
	});
});

function checkDNI() {
	var dni = document.getElementById("DNI").value;
	  var numero;
	  var letr;
	  var letra;
	  var expresion_regular_dni;
 
	  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
	 
	  if(expresion_regular_dni.test (dni) == true){
		 numero = dni.substr(0,dni.length-1);
		 letr = dni.substr(dni.length-1,1);
		 numero = numero % 23;
		 letra='TRWAGMYFPDXBNJZSQVHLCKET';
		 letra=letra.substring(numero,numero+1);
			if (letra!=letr.toUpperCase()) {
				error('Dni erroneo, la letra del NIF no se corresponde');
				document.getElementById("DNI").focus();
				return;
			}
		}
	  else{
		 error('Dni erroneo, formato no válido');
		 document.getElementById("DNI").focus();
		 return;
	   }
	var data = {"username": dni, "func": "read"};
	 $.ajax({
	   type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : data,
	   success :  function(response) {
			if (response[2] == null) {
				error("El DNI no existe en el sistema, no puede proceder con el registro");
				document.getElementById("DNI").value = "";
			}
			else if (!response[4].startsWith("nulo")) {
				error("Ya existe una cuenta de usuario, no puede proceder con el registro");
				document.getElementById("DNI").value = "";
			}
	   }
	 });
}

function correct(msg) {
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
				setTimeout( function() {
					$('#main').hide("scale",
					{percent: 0, direction: 'both', origin: ['middle','right']},2100);   
				$("#main").promise().done(function() {
					window.location.href = "login.html";
				});
				}, 2000);
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

function submit() {
	var dni = document.getElementById("DNI").value;
	var email = document.getElementById("email").value;
	var pass1 = document.getElementById("pass1").value;
	var pass2 = document.getElementById("pass2").value;
	
	if (pass1 != pass2)
		error("Las contraseñas no coinciden");
	else if(dni == "")
		error("Primero inserte su DNI");
	else if (email =="")
		error("Inserte una dirección de correo electrónico");
	else {
		var data = {"username": document.getElementById("email").value, "dni": dni, "pass": pass1};
		$.ajax({
	   type : 'POST',
	   url  : 'php/register.php',
	   data : data,
	   success :  function(response) {
		   if (response == "ok") {
			   correct("Registro finalizado con éxito!");
		   }
		   else {
			   error("Ocurrió un problema :'(");
		   }
	   }
	 });
	}
}