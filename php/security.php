<?php

	function checkPermissions($db_con, $user, $permissionRequired1 , $permissionRequired2) {
				
				if ($stmt = mysqli_prepare($db_con, "SELECT permiso FROM users WHERE email = ?")) {
					mysqli_stmt_bind_param($stmt, "s", $user);
					mysqli_stmt_execute($stmt);
					mysqli_stmt_bind_result($stmt, $permiso);
					mysqli_stmt_fetch($stmt);
				
					if ($permiso != $permissionRequired1 && $permiso != $permissionRequired2) {
						return false;
					}
				}
			return true;
	}

?>