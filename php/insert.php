<?php

	function insertFunction($link, $user_email) {
			 if ($user_email == "asignatures") {
			 if ($stmt = $link->prepare("SELECT ID FROM asignatures ORDER BY ID DESC LIMIT 0 , 1" )) {
				$stmt->execute();
				$stmt->store_result();
				$stmt->bind_result($last_id);
				$stmt->fetch();
				$temp = intval($last_id) + 1;
				mysqli_stmt_close($stmt);
				$sql = "INSERT INTO asignatures (NOMBRE, ID, ANHO, CURSO)
				VALUES ('".$_POST["NOMBRE"]."','".$temp."','".$_POST["ANHO"]."','".$_POST["CURSO"]."')";
				if (!mysqli_query($link,$sql)) {
					echo 'error';
				}
				else {
					echo 'ok';
				}
			 }
		 }
		 else if ($user_email == "teachers") {
			 $permiso = 1;
			 $sql = "INSERT INTO users (DNI, NOMBRE, APELLIDOS, EMAIL, PERMISO)
			VALUES ('".$_POST["DNI"]."','".$_POST["NOMBRE"]."','".$_POST["APELLIDOS"]."','".$_POST["EMAIL"]."','".$permiso."')";
			if (mysqli_query($link, $sql)) {
				 $sql = "INSERT INTO profesor (DNI, ID_ASIGNATURA) VALUES ('".$_POST["DNI"]."','".$_POST["ASIGNATURA"]."')";
				if (!mysqli_query($link, $sql)) {
					echo 'error';
				}
				else {
					echo 'ok';
				}
			} else {
				echo 'error';
			}
		 }
		 else if ($user_email == "alumnos") {
			 $permiso = 2;
			 $sql = "INSERT INTO users (DNI, NOMBRE, APELLIDOS, EMAIL, PERMISO)
			VALUES ('".$_POST["DNI"]."','".$_POST["NOMBRE"]."','".$_POST["APELLIDOS"]."','".$_POST["EMAIL"]."','".$permiso."')";
			if (mysqli_query($link, $sql)) {
				 $sql = "INSERT INTO alumno (DNI, CURSO) VALUES ('".$_POST["DNI"]."','".$_POST["CURSO"]."')";
				if (!mysqli_query($link, $sql)) {
					echo 'error';
				}
				else {
					echo 'ok';
				}
			} else {
				echo 'error';
			}
		}
	}

?>