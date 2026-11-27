CREATE TABLE IF NOT EXISTS `productos` (
	`id_producto` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`img_url` VARCHAR(255),
	`nombre` VARCHAR(100) NOT NULL,
	`descripcion` VARCHAR(255),
	`precio` DECIMAL(10,2) NOT NULL,
	`stock` INTEGER NOT NULL CHECK (stock >= 0),
	`categoria_id` INTEGER UNSIGNED NOT NULL,
	`estado` BOOLEAN NOT NULL DEFAULT TRUE,
	PRIMARY KEY(`id_producto`)
);


CREATE TABLE IF NOT EXISTS `ticket` (
	`id_ticket` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`caja_id` INTEGER UNSIGNED,
	`empleado_id` INTEGER UNSIGNED,
	`usuario_id` INTEGER UNSIGNED,
	`direccion_id` INTEGER UNSIGNED,
	`fecha_venta` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`estado` ENUM('Completado', 'Pendiente', 'Enviado', 'Entregado', 'Cancelado') NOT NULL,
	`tipo_venta` ENUM('PDV', 'WEB') NOT NULL,
	`total` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY(`id_ticket`)
);


CREATE TABLE IF NOT EXISTS `personal` (
	`id_personal` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NOT NULL,
	`apellidos` VARCHAR(60) NOT NULL,
	`correo` VARCHAR(50) NOT NULL UNIQUE,
	`contra_hash` VARCHAR(255) NOT NULL,
	`rol_id` INTEGER UNSIGNED NOT NULL,
	PRIMARY KEY(`id_personal`)
);


CREATE TABLE IF NOT EXISTS `roles` (
	`id_rol` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`rol` VARCHAR(30) NOT NULL,
	PRIMARY KEY(`id_rol`)
);


CREATE TABLE IF NOT EXISTS `categorias` (
	`id_categoria` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`categoria` VARCHAR(50) NOT NULL,
	PRIMARY KEY(`id_categoria`)
);


CREATE TABLE IF NOT EXISTS `caja` (
	`id_caja` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`numero_caja` INTEGER NOT NULL UNIQUE,
	PRIMARY KEY(`id_caja`)
);


CREATE TABLE IF NOT EXISTS `detalle_ticket` (
	`id_detalle` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`ticket_id` INTEGER UNSIGNED NOT NULL,
	`producto_id` INTEGER UNSIGNED NOT NULL,
	`cantidad` INTEGER NOT NULL,
	`precio_unitario` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY(`id_detalle`)
);


CREATE TABLE IF NOT EXISTS `turnos_caja` (
	`id_turno_caja` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`personal_id` INTEGER UNSIGNED NOT NULL,
	`fecha_apertura` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`monto_inicial` DECIMAL(10,2) NOT NULL,
	`fecha_cierre` DATETIME,
	`monto_final` DECIMAL(10,2),
	`caja_id` INTEGER UNSIGNED NOT NULL,
	PRIMARY KEY(`id_turno_caja`)
);


CREATE TABLE IF NOT EXISTS `usuarios` (
	`id_usuario` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NOT NULL,
	`apellido` VARCHAR(60) NOT NULL,
	`correo` VARCHAR(50) NOT NULL UNIQUE,
	`contra_hash` VARCHAR(255) NOT NULL,
	`fecha_registro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`id_usuario`)
);


CREATE TABLE IF NOT EXISTS `metodos_pago` (
	`id_metodo_pago` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`metodo_pago` VARCHAR(40) NOT NULL,
	PRIMARY KEY(`id_metodo_pago`)
);


CREATE TABLE IF NOT EXISTS `pago` (
	`id_pago` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`ticket_id` INTEGER UNSIGNED NOT NULL,
	`metodo_pago_id` INTEGER UNSIGNED NOT NULL,
	`monto` DECIMAL(10,2) NOT NULL,
	`referencia_externa` VARCHAR(255) UNIQUE,
	`estado_pago` ENUM('Pendiente', 'Rechazado', 'Aprobado', 'Reembolsado') NOT NULL,
	`fecha_pago` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`id_pago`)
);


CREATE TABLE IF NOT EXISTS `direcciones` (
	`id_direccion` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`usuario_id` INTEGER UNSIGNED NOT NULL,
	`codigo_postal` VARCHAR(10) NOT NULL,
	`estado` VARCHAR(40) NOT NULL,
	`ciudad` VARCHAR(40) NOT NULL,
	`colonia` VARCHAR(40) NOT NULL,
	`calle` VARCHAR(40) NOT NULL,
	`numero_exterior` VARCHAR(10) NOT NULL,
	`numero_interior` VARCHAR(10),
	`referencias` VARCHAR(255),
	PRIMARY KEY(`id_direccion`)
);


CREATE TABLE IF NOT EXISTS `carrito_compras` (
	`id_carrito` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	`usuario_id` INTEGER UNSIGNED NOT NULL,
	`producto_id` INTEGER UNSIGNED NOT NULL,
	`cantidad` INTEGER NOT NULL,
	PRIMARY KEY(`id_carrito`)
);


CREATE UNIQUE INDEX `uq_carrito_usuario_producto`
ON `carrito_compras` (`usuario_id`, `producto_id`);
ALTER TABLE `productos`
ADD CONSTRAINT `fk_productos_categoria`
FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id_categoria`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `personal`
ADD CONSTRAINT `fk_personal_rol`
FOREIGN KEY (`rol_id`) REFERENCES `roles`(`id_rol`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `ticket`
ADD CONSTRAINT `fk_ticket_empleado`
FOREIGN KEY (`empleado_id`) REFERENCES `personal`(`id_personal`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `ticket`
ADD CONSTRAINT `fk_ticket_caja`
FOREIGN KEY (`caja_id`) REFERENCES `caja`(`id_caja`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `ticket`
ADD CONSTRAINT `fk_ticket_usuario`
FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`)
ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE `ticket`
ADD CONSTRAINT `fk_ticket_direccion`
FOREIGN KEY (`direccion_id`) REFERENCES `direcciones`(`id_direccion`)
ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE `detalle_ticket`
ADD CONSTRAINT `fk_detalle_ticket`
FOREIGN KEY (`ticket_id`) REFERENCES `ticket`(`id_ticket`)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE `detalle_ticket`
ADD CONSTRAINT `fk_detalle_producto`
FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id_producto`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `turnos_caja`
ADD CONSTRAINT `fk_turnos_personal`
FOREIGN KEY (`personal_id`) REFERENCES `personal`(`id_personal`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `turnos_caja`
ADD CONSTRAINT `fk_turnos_caja`
FOREIGN KEY (`caja_id`) REFERENCES `caja`(`id_caja`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `pago`
ADD CONSTRAINT `fk_pago_ticket`
FOREIGN KEY (`ticket_id`) REFERENCES `ticket`(`id_ticket`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `pago`
ADD CONSTRAINT `fk_pago_metodo`
FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodos_pago`(`id_metodo_pago`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `direcciones`
ADD CONSTRAINT `fk_direcciones_usuario`
FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE `carrito_compras`
ADD CONSTRAINT `fk_carrito_usuario`
FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE `carrito_compras`
ADD CONSTRAINT `fk_carrito_producto`
FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id_producto`)
ON UPDATE CASCADE ON DELETE CASCADE;