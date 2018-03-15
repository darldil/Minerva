$(document).ready(function() {
	 $.ajaxSetup({ cache: false });
	var cookie = {"username": getCookie("user"), "func": "read"};
	 $.ajax({
	   type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : cookie,
	   success :  function(response) {
		   
		   iniciarSesion(response);
	   }
	 });
	
	$("#content").load("home.html");
	
	function iniciarSesion(tipo) {
		
		document.getElementById("enlacesSupText").innerHTML += tipo[0]+ " " + tipo[1] +" - ";
	
		if (tipo[3] == 1) {
			$(".listaNav #ListaAsignaturas").remove();
			$(".listaNav #ListaProfesores").remove();
			//$(".listaNav #ListaAlumnos").remove();
		}
		else if (tipo[3] == 2) {
			$(".listaNav #ListaAsignaturas").remove();
			$(".listaNav #ListaProfesores").remove();
			$(".listaNav #ListaAlumnos").remove();
		}
		
		else
			$(".listaNav #Calificaciones").remove();
	}	  
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookie() {
    var cookie=getCookie("user");
	
    if (cookie=="") {
		alert("Debe iniciar sesion de nuevo");
        window.location.href = "login.html";
    }
}

function cerrarSesion() {
	var cookie = "user=Admin; expires=Thu, 01 Jan 1970 00:00:01 GMT";
		document.cookie = cookie;
		window.location.href = "login.html";
	
}

function redirigir(id) {
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