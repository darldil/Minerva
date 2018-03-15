<?php

	session_start();
	include 'dbconfig.php';
	
	  $email = trim($_POST['username']);
	  $pass = trim($_POST['pass']);
	  $dni =  trim($_POST['dni']);
	  
	  $sql = "UPDATE users SET EMAIL = '".$email."' WHERE DNI = '".$dni."'";
	  if (mysqli_query($link, $sql)) {
			$sql = "INSERT INTO login (email, passw)
				VALUES ('".$email."','".$pass."')";
			if (!mysqli_query($link, $sql)) {
				echo 'error';
			}
			else {
				echo 'ok';
			}
		}
		else {
			echo 'error';
		}
	 
	  
	  mysqli_close($link);

?>