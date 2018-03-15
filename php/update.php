<?php

	function updateFunction($link, $user_email) {
		if ($user_email == "updateCalification") {
			if (!checkPermissions($link, trim($_POST['email']),  "1", "1")) { echo json_encode( "null"); return;}
			$query =  "SELECT asi.ID as ID FROM califications cal join asignatures asi on 
			asi.ID = cal.ID_ASIGNATURA WHERE DNI_AL = '".$_POST["DNI"]."' and asi.ID = '".$_POST["ASIG"]."'";
			$result = mysqli_query($link, $query);
			$tmp = "null";
			while($row = $result->fetch_assoc() ){
			  $tmp = $row['ID'];
			}
			if($tmp != "null"){
				$sql = "UPDATE califications SET NOTA = '".$_POST["NOTA"]."' WHERE ID_ASIGNATURA = ".$tmp." and DNI_AL = '".$_POST["DNI"]."'";
					if (!mysqli_query($link, $sql)) {
						echo 'error';
					}
					else {
						echo 'ok';
					}
			}
			else {
				$sql = "INSERT INTO califications (NOTA, ID_ASIGNATURA, DNI_AL)
				VALUES ('".$_POST["NOTA"]."','".$_POST["ASIG"]."','".$_POST["DNI"]."')";
				if (!mysqli_query($link,$sql)) {
					echo 'error';
				}
				else {
					echo 'ok';
				}
			
			}
		}
		if ($user_email == "updateCurseAl") {
			if (!checkPermissions($link, trim($_POST['email']),  "0", "0")) { echo json_encode( "null"); return;}
			$sql = "UPDATE alumno SET CURSO = '".$_POST["CURSO"]."' WHERE DNI = '".$_POST["DNI"]."'";
					if (!mysqli_query($link, $sql)) {
						echo 'error';
					}
					else {
						echo 'ok';
					}
		}
	}

?>