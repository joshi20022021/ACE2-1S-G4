-- ejemplos

DELETE FROM Pacientes WHERE id = 4;

RENAME TABLE `pacientes`     TO `Pacientes`;
RENAME TABLE `diagnosticos`  TO `Diagnósticos`;
RENAME TABLE `camilla`      TO `Camilla`;
RENAME TABLE `signos_vitales` TO `Signos_Vitales`;
RENAME TABLE `usuarios` TO `Usuarios`;

ALTER TABLE Pacientes
ADD COLUMN Estado VARCHAR(45);

UPDATE Pacientes
SET Estado = "proceso"
WHERE Pacientes.id = 1;

UPDATE Diagnósticos
SET Estado = 'proceso'
WHERE id = 1 AND Pacientes_id = 1;

-- ficha
SELECT p.Nombre_Completo        AS nombres,
		p.edad                  AS edad,
		p.Sexo                  AS sexo,
		p.No_Exp_Med           AS expediente,
		p.Tipo_Sangre          AS tipoSangre,
		p.Fecha                AS fechaIngreso
FROM Pacientes p WHERE p.id = 1;

SELECT d.Diagnostico_Principal AS diagnostico,
                       d.Sintomas_Reportados   AS sintomas,
                       d.Condiciones           AS condiciones,
                       d.Antecedentes          AS antecedentes,
                       d.Tratamiento           AS tratamiento,
                       d.Alergias             AS alergias,
                       d.Condiciones          AS condiciones,
                       d.Estado               AS estado,
                       d.Fecha               AS fecha,
                       d.Fecha_final         AS fechafinal,
                       d.Observaciones       AS observaciones,
                       d.Recomendaciones     AS recomendaciones
                FROM Diagnósticos d
                WHERE d.Pacientes_id = 2;

ALTER TABLE Pacientes
  MODIFY Camilla_id INT NULL;

ALTER TABLE Pacientes AUTO_INCREMENT = 1; -- importante para reiniciar id

-- datos ya quemados
INSERT INTO Usuarios (Nombre_Completo, UID, Tipo_Usuario, Fecha)
VALUES ('Leo Wick', 'Cambiar', 'Especialista', NOW());

INSERT INTO Usuarios (Nombre_Completo, UID, Tipo_Usuario, Fecha)
VALUES ('Ana Cruz', 'Cambiar1', 'Residente', NOW());

INSERT INTO Camilla (Estado, Fecha)
VALUES ('Vacia', NOW());

-- utilidades
 
SELECT * FROM Diagnósticos; -- ver tabla

SELECT NOW();

SET time_zone = '-06:00'; -- zona horaria guatemala
SET time_zone = '+06:00'; -- zona horaria servidor

ALTER TABLE Diagnósticos
ADD COLUMN Promedio_ECG int NOT NULL;

UPDATE Pacientes SET Camilla_id = 1 WHERE id = 1;

DROP TABLE Signos_vitales;

SHOW TABLES;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Pacientes;
SET FOREIGN_KEY_CHECKS = 1;

-- 	DDL


CREATE TABLE IF NOT EXISTS `ACYE2`.`Usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre_Completo` VARCHAR(550) NOT NULL,
  `UID` VARCHAR(255) NOT NULL,
  `Tipo_Usuario` VARCHAR(55) NOT NULL,
  `Fecha` TIMESTAMP NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `RFID_UNIQUE` (`UID` ASC) VISIBLE,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `ACYE2`.`Camilla` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Estado` VARCHAR(45) NOT NULL,
  `Fecha` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `ACYE2`.`Pacientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre_Completo` VARCHAR(255) NOT NULL,
  `edad` INT NOT NULL,
  `Sexo` VARCHAR(1) NOT NULL,
  `No_Exp_Med` INT NOT NULL,
  `Tipo_Sangre` VARCHAR(3) NOT NULL,
  `Fotografía` MEDIUMBLOB NOT NULL,
  `Fecha` TIMESTAMP NOT NULL,
  `Usuarios_id` INT NOT NULL,
  `Camilla_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Usuarios_id`, `Camilla_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Pacientes_Usuarios_idx` (`Usuarios_id` ASC) VISIBLE,
  INDEX `fk_Pacientes_Camilla1_idx` (`Camilla_id` ASC) VISIBLE,
  CONSTRAINT `fk_Pacientes_Usuarios`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `ACYE2`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pacientes_Camilla1`
    FOREIGN KEY (`Camilla_id`)
    REFERENCES `ACYE2`.`Camilla` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `ACYE2`.`Diagnósticos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Diagnostico_Principal` VARCHAR(60) NOT NULL,
  `Sintomas_Reportados` TEXT NOT NULL,
  `Antecedentes` TEXT NOT NULL,
  `Condiciones` TEXT NOT NULL,
  `Alergias` TEXT NOT NULL,
  `Tratamiento` TEXT NOT NULL,
  `Observaciones` TEXT NOT NULL,
  `Recomendaciones` TEXT NOT NULL,
  `Estado` VARCHAR(45) NOT NULL,
  `Minimo` INT NOT NULL,
  `Maximo` INT NOT NULL,
  `Promedio` INT NOT NULL,
  `Minimo_ECG` INT NOT NULL,
  `Maximo_ECG` INT NOT NULL,
  `Promedio_ECG` INT NOT NULL,
  `Fecha` TIMESTAMP NOT NULL,
  `Fecha_final` TIMESTAMP NOT NULL,
  `Pacientes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Pacientes_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Diagnósticos_Pacientes1_idx` (`Pacientes_id` ASC) VISIBLE,
  CONSTRAINT `fk_Diagnósticos_Pacientes1`
    FOREIGN KEY (`Pacientes_id`)
    REFERENCES `ACYE2`.`Pacientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE IF NOT EXISTS `ACYE2`.`Signos_Vitales` (
  `id` INT NOT NULL,
  `Oxigenacion` INT NOT NULL,
  `Frecuencia_Cardiaca` INT NOT NULL,
  `Fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Diagnósticos_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Diagnósticos_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Signos_Vitales_Diagnósticos1_idx` (`Diagnósticos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Signos_Vitales_Diagnósticos1`
    FOREIGN KEY (`Diagnósticos_id`)
    REFERENCES `ACYE2`.`Diagnósticos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
  