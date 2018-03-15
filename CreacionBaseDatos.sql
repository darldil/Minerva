--
-- Base de datos: `minerva`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `DNI` varchar(255) NOT NULL,
  `CURSO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatures`
--

CREATE TABLE `asignatures` (
  `NOMBRE` varchar(255) NOT NULL,
  `ID` int(11) NOT NULL,
  `ANHO` int(11) NOT NULL,
  `CURSO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `califications`
--

CREATE TABLE `califications` (
  `ID_ASIGNATURA` int(11) NOT NULL,
  `DNI_AL` varchar(255) NOT NULL,
  `NOTA` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id_user` tinyint(4) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passw` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id_user`, `email`, `passw`) VALUES
(1, 'admin@minerva.com', 'admin123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `DNI` varchar(255) NOT NULL,
  `ID_ASIGNATURA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `DNI` varchar(255) NOT NULL,
  `NOMBRE` varchar(255) NOT NULL,
  `APELLIDOS` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PERMISO` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`DNI`, `NOMBRE`, `APELLIDOS`, `EMAIL`, `PERMISO`) VALUES
('84012672C', 'Mauricio', 'Abbati Loureiro', 'admin@minerva.com', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD KEY `fk_al` (`DNI`);

--
-- Indices de la tabla `asignatures`
--
ALTER TABLE `asignatures`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `califications`
--
ALTER TABLE `califications`
  ADD KEY `fk_idAsig` (`ID_ASIGNATURA`),
  ADD KEY `fk_idAl` (`DNI_AL`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `email` (`email`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD KEY `fk_prof` (`DNI`),
  ADD KEY `fk_profAs` (`ID_ASIGNATURA`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`DNI`,`EMAIL`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD UNIQUE KEY `DNI` (`DNI`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id_user` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `fk_al` FOREIGN KEY (`DNI`) REFERENCES `users` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `califications`
--
ALTER TABLE `califications`
  ADD CONSTRAINT `fk_idAl` FOREIGN KEY (`DNI_AL`) REFERENCES `alumno` (`DNI`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idAsig` FOREIGN KEY (`ID_ASIGNATURA`) REFERENCES `asignatures` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`EMAIL`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `fk_prof` FOREIGN KEY (`DNI`) REFERENCES `users` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_profAs` FOREIGN KEY (`ID_ASIGNATURA`) REFERENCES `asignatures` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
