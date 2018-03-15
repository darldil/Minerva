$(document).ready(function() {
	 $.ajaxSetup({ cache: false });
	 adaptarRegistro();
});

function adaptarRegistro() {
	var tipo = window.sharedVariable;
	
	if (tipo == "pr") {
		$("#content #columnas").attr('colspan',4);
		$("#content #curso").remove();
		$("#content #cursoRow").remove();
		$("#content #anho").remove();
		 var info = {"username": "all_asignatures",  "email": getCookie("user"), "func": "read"};
			 
			 $.ajax({
			 type : 'POST',
			   url  : 'php/session.php',
			   dataType: 'json',
			   data : info,
			   success :  function(response) {
				   if(response != null && $.isArray(response)){
					  var valueTmp = 1;
						for (var i = 0; i < response.length; i++) {
						var  n = 1*i;
						$('select[id=as]').append($('<option>' , { 
							value: valueTmp,
							text: response[n] + " - " + response[n + 2] + "º"
						}));
						valueTmp++;
						i = i + 2;
					}
				   }
			   }
		});
	}
	else if (tipo == "al") {
		$("#content #columnas").attr('colspan',4);
		$("#content #asignatura").remove();
        $("#content #cursotd").remove();
		$("#content #cursoRow").remove();
		$("#content #anho").remove();
	}
	else if (tipo == "as") {
		$("#content #columnas").attr('colspan',3);
		$("#content #ap").remove();
		$("#content #DNI").remove();
		$("#content #asignatura").remove();
		$("#content #email").remove();
		$("#content #otrosDatos").remove();
	}
}

function checkSelected(type) {
	var tipo = $("[name=selected]").prop('checked');
	
	if (tipo == false)
		alert ("Selecciona un elemento");
	else
		 redirigir("create", type);
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
		
		else if (id == "create") {
			if (type == "al") {
				window.sharedVariable = "al";
				$("#content").load("internalregist.html");
			}
			else if (type == "pr") {
				window.sharedVariable = "pr";
				$("#content").load("internalregist.html");
			}
			else {
				window.sharedVariable = "as";
				$("#content").load("internalregist.html");
			}
		}
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

function checkDNI(dni) {
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
				return false;
			}
		}
	  else{
		 error('Dni erroneo, formato no válido');
		 document.getElementById("DNI").focus();
		 return false;
	   }
	  return true;
}

function create(formulario) {
	
	var tipo = window.sharedVariable;
	var nombre = formulario.nombre.value;
	
	switch(tipo) {
	case "as":
		debugger;
		var anho = formulario.anhoBox.value;
		var year = anho.split(" ");
		if (/^\d+$/.test(year[0]) == false || parseInt(year[0]) < 1900 ||  parseInt(year[0] > 2999)){
			error("Año no valido");
			return;
		}
		else if (year[1] != "-") {
			error("Año no valido");
			return;
		}
		else if (/^\d+$/.test(year[2]) == false || parseInt(year[2]) != parseInt(year[0]) + 1){
			error("Año no valido");
			return;
		}
        var curso = formulario.cur.value
		var info = {"username": "asignatures", "func": "insertData", "NOMBRE": nombre , "ANHO": parseInt(year[0]), "CURSO": curso};
		
		 $.ajax({
		 type : 'POST',
		   url  : 'php/session.php',
		   data : info,
		   success :  function(response) {
				if(response == "ok") {	correct("Operacion realizada correctamente", "as");	}
				else {	error("Error! Ha ocurrido algun problema :(");	}
			}
		});
	break;
	case "pr":
		var apellidos = formulario.ap.value;
		var dni = formulario.DNI.value;
		if (!checkDNI(dni)) {return;}
        var n = (new Date).getTime();
		var email = "nulo" + n;
		var asig = parseInt(formulario.as.value);
		
		var info = {"username": "teachers", "func": "insertData", "NOMBRE": nombre , "ANHO": curso,
		"APELLIDOS": apellidos , "DNI": dni, "EMAIL": email, "ASIGNATURA": asig};
		 $.ajax({
		 type : 'POST',
		   url  : 'php/session.php',
		   data : info,
		   success :  function(response) {
				if(response == "ok") {	correct("Operacion realizada correctamente", "pr");	}
				else {	error("Error! Ha ocurrido algun problema :(");	}
			}
		});
	break;
	case "al":
		var apellidos = formulario.ap.value;
		var dni = formulario.DNI.value;
		if (!checkDNI(dni)) { return;}
        var n = (new Date).getTime();
		var email = "nulo" + n;
		var curso = parseFloat(formulario.cur.value);
        debugger;
		var info = {"username": "alumnos", "func": "insertData", "NOMBRE": nombre , "ANHO": curso,
		"APELLIDOS": apellidos , "DNI": dni, "EMAIL": email, "CURSO": curso};
		
		 $.ajax({
		 type : 'POST',
		   url  : 'php/session.php',
		   data : info,
		   success :  function(response) {
				if(response == "ok") {	correct("Operacion realizada correctamente", "al");	}
				else {	error("Error! Ha ocurrido algun problema :(");	}
			}
		});
	break;
	}
}