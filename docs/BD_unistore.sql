-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema unistore
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `unistore` ;

-- -----------------------------------------------------
-- Schema unistore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `unistore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `unistore` ;

-- -----------------------------------------------------
-- Table `unistore`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `unistore`.`usuario` ;

CREATE TABLE IF NOT EXISTS `unistore`.`usuario` (
  `id_usu` INT NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(14) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `nome` VARCHAR(50) NULL DEFAULT NULL,
  `nome_usu` VARCHAR(50) NULL DEFAULT NULL,
  `senha` VARCHAR(20) NULL DEFAULT NULL,
  `celular` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`id_usu`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `unistore`.`compra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `unistore`.`compra` ;

CREATE TABLE IF NOT EXISTS `unistore`.`compra` (
  `id_compra` INT NOT NULL AUTO_INCREMENT,
  `data_pedido` DATE NULL DEFAULT NULL,
  `valor_total_compra` DOUBLE NULL DEFAULT NULL,
  `status_compra` ENUM('finalizada', 'em andamento') NULL DEFAULT NULL,
  `id_usu` INT NOT NULL,
  PRIMARY KEY (`id_compra`),
  INDEX `id_usu` (`id_usu` ASC) VISIBLE,
  CONSTRAINT `compra_ibfk_1`
    FOREIGN KEY (`id_usu`)
    REFERENCES `unistore`.`usuario` (`id_usu`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `unistore`.`instituicao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `unistore`.`instituicao` ;

CREATE TABLE IF NOT EXISTS `unistore`.`instituicao` (
  `nome_instituicao` VARCHAR(150) NOT NULL,
  `logo` LONGBLOB NULL DEFAULT NULL,
  `localizacao` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`nome_instituicao`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `unistore`.`uniforme`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `unistore`.`uniforme` ;

CREATE TABLE IF NOT EXISTS `unistore`.`uniforme` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `tamanho` ENUM('P', 'M', 'G', 'infantil') NOT NULL,
  `condicao` ENUM('nova', 'seminova', 'usada') NOT NULL,
  `titulo` VARCHAR(20) NOT NULL,
  `foto` LONGBLOB NULL DEFAULT NULL,
  `descricao` VARCHAR(200) NULL DEFAULT NULL,
  `cor` VARCHAR(30) NULL DEFAULT NULL,
  `valor` DECIMAL(10,2) NULL DEFAULT NULL,
  `contato` VARCHAR(15) NULL DEFAULT NULL,
  `nome_instituicao` VARCHAR(150) NOT NULL,
  `id_usu` INT NULL DEFAULT NULL,
  `Id_venda` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_produto`),
  INDEX `nome_instituicao` (`nome_instituicao` ASC) VISIBLE,
  INDEX `id_usu` (`id_usu` ASC) VISIBLE,
  CONSTRAINT `uniforme_ibfk_1`
    FOREIGN KEY (`nome_instituicao`)
    REFERENCES `unistore`.`instituicao` (`nome_instituicao`),
  CONSTRAINT `uniforme_ibfk_2`
    FOREIGN KEY (`id_usu`)
    REFERENCES `unistore`.`usuario` (`id_usu`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `unistore`.`usuario_endereco`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `unistore`.`usuario_endereco` ;

CREATE TABLE IF NOT EXISTS `unistore`.`usuario_endereco` (
  `id_endereco` INT NOT NULL AUTO_INCREMENT,
  `rua` VARCHAR(200) NULL DEFAULT NULL,
  `cep` VARCHAR(9) NULL DEFAULT NULL,
  `bairo` VARCHAR(200) NULL DEFAULT NULL,
  `cidade` ENUM('barueri', 'osasco', 'santana de parnaiba', 'carapicuiba', 'jandira', 'itapevi') NULL DEFAULT NULL,
  `numero` INT NULL DEFAULT NULL,
  `id_usu` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_endereco`),
  INDEX `id_usu` (`id_usu` ASC) VISIBLE,
  CONSTRAINT `usuario_endereco_ibfk_1`
    FOREIGN KEY (`id_usu`)
    REFERENCES `unistore`.`usuario` (`id_usu`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `unistore`.`compra_has_uniforme`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `unistore`.`compra_has_uniforme` ;

CREATE TABLE IF NOT EXISTS `unistore`.`compra_has_uniforme` (
  `compra_id_compra` INT NOT NULL,
  `uniforme_id_produto` INT NOT NULL,
  `quantidade` INT NULL,
  `subtotal` DECIMAL(10,2) NULL,
  PRIMARY KEY (`compra_id_compra`, `uniforme_id_produto`),
  INDEX `fk_compra_has_uniforme_uniforme1_idx` (`uniforme_id_produto` ASC) VISIBLE,
  INDEX `fk_compra_has_uniforme_compra1_idx` (`compra_id_compra` ASC) VISIBLE,
  CONSTRAINT `fk_compra_has_uniforme_compra1`
    FOREIGN KEY (`compra_id_compra`)
    REFERENCES `unistore`.`compra` (`id_compra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compra_has_uniforme_uniforme1`
    FOREIGN KEY (`uniforme_id_produto`)
    REFERENCES `unistore`.`uniforme` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
