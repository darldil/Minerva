<?php

	function readFunction($link, $user_email) {
			 if ($user_email == 'all_teachers') {
				if (!checkPermissions($link, trim($_POST['email']),  "0", "0")) { echo json_encode( "null"); return;}					
					if ($resultado = mysqli_query($link, "SELECT u.NOMBRE, u.APELLIDOS, u.EMAIL, u.DNI,
					a.NOMBRE as NASIG, a.CURSO as CURSO FROM users u JOIN profesor p on u.DNI = p.DNI
					join asignatures a on p.ID_ASIGNATURA = a.ID WHERE permiso=1 order by u.APELLIDOS")) {
						$result = array();
						while ( $row = mysqli_fetch_assoc($resultado) ) {
							array_push($result, $row['NOMBRE']);
							array_push($result, $row['APELLIDOS']);
							array_push($result, $row['EMAIL']);
							array_push($result, $row['DNI']);
							array_push($result, $row['NASIG']);
							array_push($result, $row['CURSO']);
						}
					}
			}
			else if($user_email == 'all_alumnos') {
				if (!checkPermissions($link, trim($_POST['email']),  "0", "1")) { echo json_encode( "null"); return;}		
				if ($resultado = mysqli_query($link,"SELECT u.NOMBRE, u.APELLIDOS, u.EMAIL, u.DNI,
				a.CURSO FROM users u JOIN alumno a on u.DNI = a.DNI WHERE permiso=2 order by u.APELLIDOS")) {
					$result = array();
					while ( $row = mysqli_fetch_assoc($resultado) ) {
						array_push($result, $row['NOMBRE']);
						array_push($result, $row['APELLIDOS']);
						array_push($result, $row['EMAIL']);
						array_push($result, $row['DNI']);
						array_push($result, $row['CURSO']);
					}
				}
			}
			else if($user_email == 'al_curse') {
				if (!checkPermissions($link, trim($_POST['email']),  "0", "0")) { echo json_encode( "null"); return;}		
				if ($resultado = mysqli_query($link,"SELECT CURSO FROM alumno WHERE DNI ='".$_POST['dni']."'")) {
					$result = array();
					while ( $row = mysqli_fetch_assoc($resultado) ) {
						array_push($result, $row['CURSO']);
					}
				}
			}
			else if($user_email == 'all_alumnos_by_curse') {
				if (!checkPermissions($link, trim($_POST['email']),  "0", "1")) { echo json_encode( "null"); return;}		
				if ($resultado = mysqli_query($link, "SELECT u.NOMBRE, u.APELLIDOS, u.EMAIL, calif.ID_ASIGNATURA as ID,calif.NOTA as NOTA,
					a.CURSO, asig.ANHO  as ANHO, u.DNI FROM users u 
					JOIN alumno a on u.DNI = a.DNI 
					join asignatures asig on a.CURSO = asig.CURSO 
					left join califications calif on a.DNI = calif.DNI_AL 
					WHERE permiso=2 and asig.ID  = '".$_POST['id_asignature']."' order by u.APELLIDOS")) {
						//El original era asig.ID en vez de calif.ID_ASIGNATURA
					$result = array();
					while ( $row = mysqli_fetch_assoc($resultado) ) {
						array_push($result, $row['NOMBRE']);
						array_push($result, $row['APELLIDOS']);
						array_push($result, $row['EMAIL']);
						array_push($result, $row['NOTA']);
						array_push($result, $row['CURSO']);
						array_push($result, $row['DNI']);
						array_push($result, $row['ID']);
						array_push($result, $row['ANHO']);
					}
				}
			}
			else if($user_email == 'asignature') {
				if (!checkPermissions($link, trim($_POST['email']),  "0", "1")) { echo json_encode( "null"); return;}
				if ($resultado = mysqli_query($link,"SELECT ID_ASIGNATURA FROM profesor where DNI = '".$_POST['DNI']."'")){
					$result = array();
					while ( $row = mysqli_fetch_assoc($resultado) ) {
						array_push($result, $row['ID_ASIGNATURA']);
					}
				}
			}
			else if($user_email == 'all_asignatures') {
				if (!checkPermissions($link, trim($_POST['email']),  "0", "0")) { echo json_encode( "null"); return;}
				if ($resultado = mysqli_query($link,"SELECT NOMBRE, ANHO, CURSO FROM asignatures order by ID")){
					$result = array();
					while ( $row = mysqli_fetch_assoc($resultado) ) {
						array_push($result, $row['NOMBRE']);
						array_push($result, $row['ANHO']);
                        array_push($result, $row['CURSO']);
					}
				}
			}
			else if($user_email == 'califications') {
				if (!checkPermissions($link, trim($_POST['email']),  "2", "2")) { echo json_encode( "null"); return;}
				if ($resultado = mysqli_query($link,"SELECT asi.NOMBRE as ASIGNATURA, NOTA, asi.CURSO as CURSO from califications 
				JOIN alumno al on DNI_AL = al.DNI join users u on al.DNI = u.DNI join asignatures asi on ID_ASIGNATURA = asi.ID 
				where u.email = '".$_POST['email']."' and asi.ANHO = '".$_POST['year']."'")){
					$result = array();
					while ( $row = mysqli_fetch_assoc($resultado) ) {
						array_push($result, $row['ASIGNATURA']);
						array_push($result, $row['NOTA']);
						array_push($result, $row['CURSO']);
					}
				}
			}
			else {
				$sentencia = $link->prepare("SELECT * FROM users WHERE email= ? or dni= ?");
				$sentencia->bind_param("ss", $user_email, $user_email);
				$sentencia->execute();
				$result = $sentencia->get_result();
				
				$row = $result->fetch_assoc();
				$result = array($row['NOMBRE'], $row['APELLIDOS'], $row['DNI'], $row['PERMISO'], $row['EMAIL']);
			}

		   echo json_encode($result);
	}

?>