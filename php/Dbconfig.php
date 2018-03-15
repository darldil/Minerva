<?php

 $link = mysqli_connect("localhost", "root", "", "minerva");

	/* verificar conexión */
	if (mysqli_connect_errno()) {
		printf("Connect failed: %s\n", mysqli_connect_error());
		exit();
	}
?>