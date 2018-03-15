var err = 0;

$('document').ready(function() { 
 
 /*$('#main').hide('slide',  {direction: 'down' }, 0);
 $('#main').removeClass('hidden');*/
	$('#main').show("scale", {percent: 100, direction: 'both', origin: ['middle','middle']},1000);     
	
	$("#reg").click(function() {
		$('#main').hide("scale",
        {percent: 0, direction: 'both', origin: ['middle','right']},2100);   
				$("#main").promise().done(function() {
					window.location.href = "registration.html";
				});
	});
    
	$('#button').click( function(e) 
    {  
	  e.preventDefault();
	   var data = {
		   username: $("#user").val(),
		   password: $("#pass").val(),
	   };
    
	   $.ajax({
	   type : 'POST',
	   url  : 'php/login.php',
	   data : data,
	   success :  function(response) {      
			 if(response=="ok")	 
				correct(data);
			 else
				error(err);
		}
		});
	});
    return false;
});

function correct(data) {
	var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', 'sounds/startup.wav');
				audioElement.setAttribute('autoplay', 'autoplay');

				$.get();
				audioElement.addEventListener("load", function() {
					audioElement.play();
				}, true);
				
				$("#main").slideToggle(1600);
				/*$('#main').hide("scale",
        {percent: 0, direction: 'both', origin: ['middle','middle']},2100);   */
				$("#main").promise().done(function() {
					var fecha = new Date;
					fecha.setTime(fecha.getTime() + 900000) ;
					var cookie = "user="+data.username+"; expires=" + fecha.toGMTString();
					document.cookie = cookie;
					window.location.href = "MainWindow.html";
				});
}

function error() {
		if (err == 0 ) {
			document.getElementById("user").style.borderColor += "red";
			document.getElementById("main").style.borderColor += "red";
			document.getElementById("pass").style.borderColor += "red";
			document.getElementById("Error").innerHTML += "<p> Usuario y/o contraseña incorrectos </p>";
			document.getElementById("Error").style.color = 'red';
			err++;
		}
		$("#main").effect("shake");
		var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', 'sounds/fail.wav');
			audioElement.setAttribute('autoplay', 'autoplay');
		$.get();
		audioElement.addEventListener("load", function() {
			audioElement.play();
			}, true);
		document.getElementById("user").focus();
}