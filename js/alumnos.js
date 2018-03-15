var DNI_prof;
$(document).ready(function() {
	 $.ajaxSetup({ cache: false });
	 
	 var info = {"username": getCookie("user"), "func": "read"};
	  $.ajax({
     type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : info,
	   success :  function(response) {
           if(response != null && $.isArray(response)){
				if(response[3] == 1) {DNI_prof = response[2]; cargarDatos(1);}
				else if (response[3] == 0) {cargarDatos(0);}
			}
	   }
	});
		  
});

function cargarDatos(permisions) {
	
	switch(permisions) {
	case 0:
	//Administrador
	$("#text").remove();
	 var info = {"username": "all_alumnos",  "email": getCookie("user"), "func": "read"};
	 
	 $.ajax({
     type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : info,
	   success :  function(response) {
		   
           if(response != null && $.isArray(response)){
			   var id = 1;
				for (var i = 0; i < response.length; i++) {
					var  n = 1*i;
					var email = "Nulo";
					if (!response[n + 2].startsWith("nulo"))
						email = response[n+2];
					$("#tabla").append("<tr><td><input type='radio' name='radioButton' value ='"+id+"'/></td><td>" + 
					response[n] + "</td><td>" + response[n+1] + "</td><td id='dni "+id+"'>" + response[n+3] + "</td><td id='email "+id+"'>" +  
					email + "</td><td>" + response[n+4] + "º" +"</td></tr>");
					i += 4;
					id++;
				}
        }
    }
	});
	break;
	case 1:
	//Profesor
	$('button').remove();
	$('#radioCol').remove();
	$('#curseCol').text("Calificacion");
	var div = document.getElementById("text");
	div.style.display = 'inline';
	obtainAsignature(function(data) {
	var info = {"username": "all_alumnos_by_curse",  "func": "read", "email": getCookie("user"), "id_asignature": parseInt(data)}
		 $.ajax({
		 type : 'POST',
		   url  : 'php/session.php',
		   dataType: 'json',
		   data : info,
		   success :  function(response) {
			 if(response != null && $.isArray(response)){
				for (var i = 0; i < response.length; i++) {
					var  n = 1*i;
					var email = "Nulo";
					if (!response[n + 2].startsWith("nulo"))
						email = response[n+2];
					if (response[n+6] == data || response[n+6]  == null) {
						$("#tabla").append("<tr><td>" + response[n] + "</td><td>" +
						response[n+1] + "</td><td>" + response[n+5] + "</td><td>" +  email + "</td><td>" + response[n+3] +"</td></tr>");
					}
					i += 7;
				}
			}
		   }
		});
	});
	
	break;
	}
	
}

function obtainAsignature(handleData) {
	 var cookie = {"username": "asignature",  "DNI": DNI_prof, "email": getCookie("user"), "func": "read"};
	 $.ajax({
		   type : 'POST',
		   url  : 'php/session.php',
		   dataType: 'json',
		   data : cookie,
		   success :  function(response) {
			  handleData(response[0]);
		   }
	 });
}

function modAl(type) {
	var selected = $("input[type='radio']:checked").val();
	var div = document.getElementById("ChangeCurse");
	if (selected == undefined)
		error ("Selecciona un elemento");
	else {
		var tmp = "dni "+ selected;
		var dni = document.getElementById ( tmp ).textContent;
		div.style.display = 'inline';
		var info = {"username": "al_curse",  "dni": dni, "email": getCookie("user"), "func": "read"};
		 
		 $.ajax({
		 type : 'POST',
		   url  : 'php/session.php',
		   dataType: 'json',
		   data : info,
		   success :  function(response) {
			   if(response != null && $.isArray(response)){	$('input[type=number]').val(response[0]);	}
			}
		});
	}
}

function changeCurse() {
	var tmp = "dni "+ $("input[type='radio']:checked").val();
	var dni = document.getElementById ( tmp ).textContent;
	var newCurse = $('input[type=number]').val();
	var info = {"username": "updateCurseAl",  "DNI": dni, "CURSO": newCurse, "email": getCookie("user"), "func": "update"};
	
	$.ajax({
     type : 'POST',
	   url  : 'php/session.php',
	   data : info,
	   success :  function(response) {
			if(response == "ok"){	correct("Operacion realizada correctamente", "al");	}
			else {	error("No puede eliminar este alumno, ya tiene una calificación");	}
		}
	});
}

function deleteAl(type) {
	var selected = $("input[type='radio']:checked").val();
	
	if (selected == undefined)
		error ("Selecciona un elemento");
	else {
		 if (confirm("Seguro que quiere eliminarlo?")) {
			 var tmp = "email "+ selected;
			 var email = document.getElementById ( tmp ).textContent;
			  var info = {"username": "t/a",  "permisos": getCookie("user"), "func": "delete", "EMAIL": email};
			  $.ajax({
				type : 'POST',
			   url  : 'php/session.php',
			   data : info,
			   success :  function(response) {
					if(response == "ok")
						correct("Operacion realizada correctamente", "al");
					else
						error("No puede eliminar este alumno, ya tiene una calificación");
				}
			});
		}
	}
}

