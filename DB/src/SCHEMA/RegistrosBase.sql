-- ==========================================
-- 1. CATÁLOGOS BASE
-- ==========================================
INSERT INTO `roles` (`rol`) VALUES
('Administrador'),
('Empleado');

INSERT INTO `categorias` (`categoria`) VALUES
('Videojuegos'),        -- id: 1
('Tarjetas de Regalo'), -- id: 2
('Consolas'),           -- id: 3
('Periféricos'),        -- id: 4
('Computadoras');       -- id: 5

INSERT INTO `caja` (`numero_caja`) VALUES
(1),
(2);

INSERT INTO `metodos_pago` (`metodo_pago`) VALUES
('Efectivo'),
('Tarjeta de Débito'),
('Tarjeta de Crédito'),
('Google Wallet');

-- ==========================================
-- 2. PERSONAL, USUARIOS Y DIRECCIONES DE PRUEBA
-- ==========================================
INSERT INTO `personal` (`nombre`, `apellidos`, `correo`, `contra_hash`, `rol_id`) VALUES
('Carlos', 'Mendoza Ruiz', 'admin@gamesstorm.com', '1234', 1),
('Sofía', 'Ramírez Torres', 'sofia.caja@gamesstorm.com', '1234', 2),
('Diego', 'Hernández López', 'diego.caja@gamesstorm.com', '1234', 2);

INSERT INTO `usuarios` (`nombre`, `apellido`, `correo`, `contra_hash`) VALUES
('Andrea', 'Vargas Soto', 'andrea.vargas@correo.com', 'Usuario1234'),
('Luis', 'Castillo Pérez', 'luis.castillo@correo.com', 'Usuario1234');

INSERT INTO `direcciones` (`usuario_id`, `codigo_postal`, `estado`, `ciudad`, `colonia`, `calle`, `numero_exterior`, `numero_interior`, `referencias`) VALUES
(1, '42080', 'Hidalgo', 'Pachuca', 'Zona Plateada', 'Blvd. Felipe Ángeles', '104', 'Depto 3B', 'Frente al parque central'),
(2, '43860', 'Hidalgo', 'Tolcayuca', 'Centro', 'Av. Juárez', '25', NULL, 'Portón negro junto a la papelería');

-- ==========================================
-- 3. PRODUCTOS BASE DE GAMESSTORM
-- ==========================================
INSERT INTO `productos` (`img_url`, `nombre`, `descripcion`, `precio`, `stock`, `categoria_id`, `estado`) VALUES
-- Videojuegos (categoria_id = 1)
('img/juegos/elden_ring_ps5.jpg', 'Elden Ring - PS5', 'Edición estándar física para PlayStation 5. RPG de acción en mundo abierto.', 1199.00, 18, 1, TRUE),
('img/juegos/zelda_totk_switch.jpg', 'The Legend of Zelda: Tears of the Kingdom - Switch', 'Cartucho físico para Nintendo Switch. Aventura y exploración.', 1399.00, 12, 1, TRUE),
('img/juegos/halo_infinite_xbox.jpg', 'Halo Infinite - Xbox Series X/S', 'Edición física para Xbox Series X y Xbox One. Shooter en primera persona.', 899.00, 15, 1, TRUE),
('img/juegos/cyberpunk_pc.jpg', 'Cyberpunk 2077: Ultimate Edition - PC', 'Código digital con expansión Phantom Liberty incluida.', 1299.00, 25, 1, TRUE),

-- Tarjetas de Regalo (categoria_id = 2)
('img/tarjetas/steam_500.jpg', 'Tarjeta de Regalo Steam $500 MXN', 'Saldo digital para tienda Steam PC. Entrega de código al instante.', 500.00, 50, 2, TRUE),
('img/tarjetas/xbox_gamepass_3m.jpg', 'Xbox Game Pass Ultimate - 3 Meses', 'Suscripción digital para consola Xbox y PC.', 749.00, 35, 2, TRUE),
('img/tarjetas/psn_25usd.jpg', 'PlayStation Store Gift Card $25 USD', 'Código de saldo prepagado para PlayStation Store.', 549.00, 40, 2, TRUE),
('img/tarjetas/eshop_600.jpg', 'Nintendo eShop Card $600 MXN', 'Saldo digital oficial para juegos y DLC en Nintendo Switch.', 600.00, 30, 2, TRUE),

-- Consolas (categoria_id = 3)
('img/consolas/ps5_slim.jpg', 'PlayStation 5 Slim 1TB (Edición Disco)', 'Consola PS5 Slim con lector de discos y 1 control DualSense.', 11499.00, 6, 3, TRUE),
('img/consolas/xbox_series_x.jpg', 'Xbox Series X 1TB', 'Consola 4K nativa con SSD de 1TB y control inalámbrico negro.', 10999.00, 5, 3, TRUE),
('img/consolas/switch_oled.jpg', 'Nintendo Switch Modelo OLED (Blanco)', 'Pantalla OLED de 7 pulgadas, 64GB de almacenamiento interno y Joy-Con blancos.', 6999.00, 9, 3, TRUE),

-- Periféricos (categoria_id = 4)
('img/perifericos/g502_hero.jpg', 'Mouse Gamer Logitech G502 HERO', 'Sensor óptico HERO 25K, 11 botones programables e iluminación RGB.', 999.00, 20, 4, TRUE),
('img/perifericos/hyperx_alloy.jpg', 'Teclado Mecánico HyperX Alloy Origins Core', 'Formato TKL compacto, switches mecánicos Red y cuerpo de aluminio.', 1799.00, 14, 4, TRUE),
('img/perifericos/cloud_ii.jpg', 'Audífonos HyperX Cloud II', 'Sonido envolvente 7.1, micrófono desmontable con cancelación de ruido.', 1599.00, 11, 4, TRUE),
('img/perifericos/dualsense_negro.jpg', 'Control DualSense Midnight Black', 'Control inalámbrico oficial PS5/PC con retroalimentación háptica.', 1499.00, 16, 4, TRUE),

-- Computadoras (categoria_id = 5)
('img/computadoras/pc_storm_rtx4060.jpg', 'PC Gamer GamesStorm Starter RTX 4060', 'Ryzen 5 5600, RTX 4060 8GB, 16GB RAM DDR4, SSD NVMe 1TB, Fuente 650W.', 18999.00, 4, 5, TRUE),
('img/computadoras/pc_storm_rtx4070.jpg', 'PC Gamer GamesStorm Pro RTX 4070', 'Intel Core i5-14600K, RTX 4070 12GB, 32GB RAM DDR5, SSD NVMe 1TB.', 29499.00, 2, 5, TRUE),
('img/computadoras/laptop_asus_tuf.jpg', 'Laptop Gamer ASUS TUF Gaming F15', 'Intel Core i7, RTX 4050 6GB, 16GB RAM, SSD 512GB, Pantalla 15.6" 144Hz.', 22499.00, 3, 5, TRUE);