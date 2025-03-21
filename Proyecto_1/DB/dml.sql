-- ejemplos
INSERT INTO Pacientes (Nombre_Completo, edad, Sexo, No_Exp_Med, Tipo_Sangre, Fotografía, Fecha, Usuarios_id, Camilla_id)
VALUES 
('Ana Li', 25, 'F', 10001, 'O+', 'http://localhost:5173/89b07a6e-c4b7-45c5-aaad-fb3911a5233a', NOW(), 1, 1),
('Leo Wu', 30, 'M', 10002, 'A-', 'http://localhost:5173/89b07a6e-c4b7-45c5-aaad-fb3911a5233a', NOW(), 2, 2);

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
 
SELECT * FROM Pacientes; -- ver tabla

DROP TABLE Usuarios;

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
    
CREATE TABLE IF NOT EXISTS `ACYE2`.`Signos_Vitales` (
  `id` INT NOT NULL,
  `Oxigenacion` INT NOT NULL,
  `Frecuencia_Cardiaca` INT NOT NULL,
  `Fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;

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
  `Fecha` TIMESTAMP NOT NULL,
  `Pacientes_id` INT NOT NULL,
  `Signos_Vitales_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Pacientes_id`, `Signos_Vitales_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Diagnósticos_Pacientes1_idx` (`Pacientes_id` ASC) VISIBLE,
  INDEX `fk_Diagnósticos_Signos_Vitales1_idx` (`Signos_Vitales_id` ASC) VISIBLE,
  CONSTRAINT `fk_Diagnósticos_Pacientes1`
    FOREIGN KEY (`Pacientes_id`)
    REFERENCES `ACYE2`.`Pacientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Diagnósticos_Signos_Vitales1`
    FOREIGN KEY (`Signos_Vitales_id`)
    REFERENCES `ACYE2`.`Signos_Vitales` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  