$(document).ready(function() {
	 $.ajaxSetup({ cache: false });
	 
	 var cookie = {"username": getCookie("user"),  "func": "read"};
	 $.ajax({
    
	   type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : cookie,
	   success :  function(response) {
		   adaptarInterfaz(response);
	 }});
		  
	function adaptarInterfaz(datos) {
		var permisos = "Alumno (Padawan)";
		
		if (datos[3] == 0) { permisos =  "Dios supremo"; }	
		else if (datos[3] == 1) { permisos = "Profesor (Master)"; }
		
		$("input[name=name]").val(datos[0]);
		$("input[name=lastname]").val(datos[1]);
		$("input[name=dni]").val(datos[2]);
		$("input[name=email]").val(datos[4]);
		$("input[name=permision]").val(permisos);
	}
});

function chanePass() {
	window.sharedVariable = "changePass";
			$("#content").load("change.html");
}