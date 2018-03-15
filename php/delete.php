<?php

	function deleteFunction($link, $user_email) {
			if ($user_email == "t/a") {
			 if (!checkPermissions($link, trim($_POST['permisos']),  "0", "0")) { echo  "null"; return;}	
			 $sql = "DELETE FROM users WHERE email='".$_POST["EMAIL"]."'";
			if (mysqli_query($link, $sql)) {
				echo "ok";
			}
			else {
				echo "error";
				echo $link->error;
			}
		 }
		else if ($user_email == "asignatura") {
			 if (!checkPermissions($link, trim($_POST['permisos']),  "0", "0")) { echo  "null"; return;}	
			 $sql = "DELETE FROM asignatures WHERE NOMBRE='".$_POST["NOMBRE"]."'";
			if (mysqli_query($link, $sql)) {
				echo "ok";
			}
			else {
				echo "error";
				echo $link->error;
			}
		 }
	}

?>