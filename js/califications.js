var DNI = new Array();
var DNI_prof;
var notas = new Array();

$(document).ready(function() {
	 $.ajaxSetup({ cache: false });
	 $('select').change(function() {
		loadCalification();
	});
	 
	 readUser(function(data) {
		 switch(data[3]) {
			 case 1: 
				var div = document.getElementById("profesor");
				div.style.display = 'inline';
				DNI_prof = data[2];
				leerListaAlumnos();
			break;
			case 2:
				var div = document.getElementById("alumno");
				div.style.display = 'inline';
				leerListaNotas();
			break;
		 }
	 });
	 
});

function readUser(handleData) {
	 var cookie = {"username": getCookie("user"), "func": "read"};
	 $.ajax({
		   type : 'POST',
		   url  : 'php/session.php',
		   dataType: 'json',
		   data : cookie,
		   success :  function(response) {
			  handleData(response);
		   }
	 });
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

function checkAnho(action) {
	var int1 = 2016;
	switch(action) {
		case 'back': 
			var str = document.getElementById("curso").value;
			var res = str.split(" ");
			int1 = parseInt(res[0]) - 1;
			var int2  = parseInt(res[2]) - 1;
			document.getElementById("curso").value = int1 + " - " + int2;
			
		break;
		case 'next':
			var str = document.getElementById("curso").value;
			var res = str.split(" ");
			int1 = parseInt(res[0]) + 1;
			var int2  = parseInt(res[2]) + 1;
			document.getElementById("curso").value = int1 + " - " + int2;
		break;
	}
	return int1;
}

function recargar(action) {
	
	var int1 = checkAnho(action);
	var tablas = $('#tabla tr').length;
	for (var i = 0; i < tablas; i++) {
		$("#"+i+"").remove();
	}
	var info = {"username": "califications",  "email": getCookie("user"), "year": int1, "func": "read"};
	$.ajax({
     type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : info,
	   success :  function(response) {
           if(response != null && $.isArray(response)){
				var id = 0;
				for (var i = 0; i < response.length; i++) {
					var  n = 1*i;
					var tmp = mensaje(response[n+1]);
					$("#tabla").append("<tr id='"+id+"'><td>" +  response[n] + "</td><td>" + response[n+2] + "º" +  "</td><td>" +
					+ response[n+1] + "</td><td>" + tmp + "</td></tr>");
					i += 2;
					id++;
			}
        }
    }
});
}

function loadCalification() {
	$('input[type=number]').val(notas[$('select').val()]);
}

function mensaje(nota) {
	if (nota < 5)
		return "SUSPENSO";
	else if (nota >=5 && nota < 7)
		return "APROBADO";
	else if (nota >=7 && nota < 9)
		return "NOTABLE";
	else if (nota >=9)
		return "SOBRESALIENTE";
	return "NO PRESENTADO";
}

function leerListaAlumnos() {
	var tmp;
	var info = {"username": "asignature",  "DNI": DNI_prof, "email": getCookie("user"), "func": "read"};
	
	$.ajax({
     type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : info,
	   success :  function(response) {
		   
		   tmp = response[0];
            info = {"username": "all_alumnos_by_curse",  "id_asignature": tmp ,"email": getCookie("user"), "func": "read"};
			$.ajax({
			 type : 'POST',
			   url  : 'php/session.php',
			   dataType: 'json',
			   data : info,
			   success :  function(response) {
				   
				   if(response != null && $.isArray(response)){
					    var id = 0;
						for (var i = 0; i < response.length; i++) {
							var  n = 1*i;
							if (response[n + 6] == tmp || response[n + 6] == null) {
								var year1 = parseInt(response[n+7]) + 1;
								$('select').append($('<option>', {
									value: id,
									text: response[n] + " " + response[n+1] + " / " + response[n+7] + " - " + year1
								}));
								DNI[id] = response[n+5];
								notas[id] = response[n+3];
								id++;
							}
							i += 7;
						}
						$('input[type=number]').val(notas[0]);
				}
			}
			});
	   }
	 });
}

function leerListaNotas() {
	document.getElementById("curso").value = "2016 - 2017";
	 var info = {"username": "califications",  "email": getCookie("user"), "year": 2016, "func": "read"};
	 $.ajax({
     type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : info,
	   success :  function(response) {
           if(response != null && $.isArray(response)){
			   var id = 0;
				for (var i = 0; i < response.length; i++) {
				var  n = 1*i;
                var tmp = mensaje(response[n+1]);
				$("#tabla").append("<tr id='"+id+"'><td>" +  response[n] + "</td><td>" + response[n+2] + "º" +  "</td><td>" +
				+ response[n+1] + "</td><td>" + tmp + "</td></tr>");
				i += 2;
				id++;
			}
			}
		}
	});
}

function setCalification() {
	obtainAsignature(function(data) {
	notas[$('select').val()] = parseFloat($('input[type=number]').val());
	var info = {"username": "updateCalification",  "func": "update", "email": getCookie("user"), "DNI": DNI[$('select').val()], 
	"NOTA": notas[$('select').val()], "ASIG": parseInt(data) };
		 $.ajax({
		 type : 'POST',
		   url  : 'php/session.php',
		   data : info,
		   success :  function(response) {
			   if(response == "ok")
				   correct("Operacion realizada correctamente", 0);
			}
		});
	});
}

