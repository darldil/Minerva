$(document).ready(function() {
	 $.ajaxSetup({ cache: false });
	 
	 var info = {"username": "all_teachers",  "email": getCookie("user"), "func": "read"};
	 
	 $.ajax({
     type : 'POST',
	   url  : 'php/session.php',
	   dataType: 'json',
	   data : info,
	   success :  function(response) {
		   
           if(response != null && $.isArray(response)){
            /* Recorremos tu respuesta con each */
            //$.each(response, function(index, value){
			var id = 1;
			for (var i = 0; i < response.length; i++) {
				var  n = 1*i;
				var email = "Nulo";
				if (!response[n + 2].startsWith("nulo"))
					email = response[n+2];
				$("#tabla").append("<tr><td><input type='radio' name='radioButton' value ='"+id+"'/></td><td>" +
				response[n] + "</td><td>" + response[n+1] + "</td><td>" + response[n+3] + "</td><td id='email "+id+"'>" +  
					email + "</td><td>" + response[n+4] + "</td><td>" + response[n+5] + "º" + "</td></tr>");
				i += 5;
				id++;
			}
        }
    }
});
		  
});

function deletePr(type) {
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
				   
				   if(response == "ok"){
						correct("Operacion realizada correctamente", "pr");
					}
				}
			});
		}
	}
}
