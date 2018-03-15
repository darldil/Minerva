$(document).ready(function() {
	 $.ajaxSetup({ cache: false });
	 
	 var info = {"username": "all_asignatures",  "email": getCookie("user"), "func": "read"};
	 
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
                /* Vamos agregando a nuestra tabla las filas necesarias */
				$("#tabla").append("<tr><td><input type='radio' name='radioButton' value ='"+id+"'/></td><td id='nombre "+id+"'>" +   
				response[n] + "</td><td>" + response[n+1] + "</td><td>" + response[n+2] + "º" + "</td></tr>");
				i = i+2;
				id++;
			}
        }
    }
});
});

function deleteAs(type) {
	//var tipo = $("[id=id]").prop('checked');
	var selected = $("input[type='radio']:checked").val();
	
	if (selected == undefined)
		error ("Selecciona un elemento");
	else {
		 if (confirm("Seguro que quiere eliminarla?")) {
			 
			 var tmp = "nombre "+ selected;
			 var nombre = document.getElementById ( tmp ).textContent;
			  var info = {"username": "asignatura",  "permisos": getCookie("user"), "func": "delete", "NOMBRE": nombre};
			  $.ajax({
				type : 'POST',
			   url  : 'php/session.php',
			   data : info,
			   success :  function(response) {
				   
				   if(response == "ok"){
						correct("Operacion realizada correctamente", "as");
					}
					else {
						error("NO PUEDE ELIMINAR LA ASIGNATURA, CONTIENE NOTAS");
					}
				}
			});
		}
	}
}
