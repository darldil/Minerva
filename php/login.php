<?php

	include 'dbconfig.php';
	
	  $user_email = trim($_POST['username']);
	  $user_password = trim($_POST['password']);
	  
	  if ($user_password == null || $user_email == null) {
		  echo "error";
		  return;
	  }
	
	  if ($stmt = mysqli_prepare($link, "SELECT passw FROM login WHERE email = ?")) {

		/* ligar parámetros para marcadores */
		mysqli_stmt_bind_param($stmt, "s", $user_email);

		/* ejecutar la consulta */
		mysqli_stmt_execute($stmt);

		/* ligar variables de resultado */
		mysqli_stmt_bind_result($stmt, $pass);

		/* obtener valor */
		mysqli_stmt_fetch($stmt);
		
		if($pass == $user_password ) {
			echo "ok";
		}
		else{
			echo "error"; // wrong details 
	   }
	 
		mysqli_stmt_close($stmt);
	  }
	  
	  mysqli_close($link);

?>