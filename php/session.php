<?php

    session_start();
	include 'dbconfig.php';
	include 'security.php';
	include 'read.php';
	include 'insert.php';
	include 'update.php';
	include 'delete.php';

	$user_email = trim($_POST['username']);
	$function = trim($_POST['func']);
	 
	switch($function) {
		case 'read':
			readFunction($link, $user_email);
		 break;
		 case 'modifyPass':
				if ($stmt = $link->prepare("UPDATE login SET passw = ? WHERE email = ?")) {                                  
					$stmt->bind_param("ss",  $_POST['pass'], $user_email); 
					$stmt->execute();
					echo 'true';
				}
		 break;
		 case 'insertData':
			 insertFunction($link, $user_email);
		 break;
		 case 'delete':
			deleteFunction($link, $user_email);
		  break;
		  case 'update':
			updateFunction($link, $user_email);
		  break;
	}
	
	 mysqli_close($link);

?>