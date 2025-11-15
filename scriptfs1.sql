SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

---------------------------------------------------------
-- 1. TABLA PRINCIPAL DE USUARIOS
---------------------------------------------------------
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_p varchar(25) not null, 
    apellido_m varchar(25) not null, 
    email nVARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono nchar(10) not null,
    ubicacion text null,
    tipo_usuario ENUM('admin','comerciante','agricultor') NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

---------------------------------------------------------
-- 2. TABLAS INDIVIDUALES SEGÚN TIPO
---------------------------------------------------------

-- Agricultor
CREATE TABLE agricultores (
    id_agricultor INT PRIMARY KEY,
    contacto nvarchar(100) null,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_agricultor) REFERENCES usuarios(id_usuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Comerciante (ANTES: clientes)
CREATE TABLE comerciantes (
    id_comerciante INT PRIMARY KEY,
    negocio nvarchar(100) null,
    correo_negocio nvarchar(255) null,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_comerciante) REFERENCES usuarios(id_usuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Admin
CREATE TABLE admins (
    id_admin INT PRIMARY KEY,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_admin) REFERENCES usuarios(id_usuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

---------------------------------------------------------
-- 3. TABLA: ALIMENTOS (SOLO ADMIN LOS GESTIONA)
---------------------------------------------------------
create table grupos_mixtos (
	id_gm int auto_increment primary key,
    grupo nvarchar(100) not null,
    tipo enum('fruta', 'verdura') not null,
    descripcion text
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE alimentos (
    id_alimento INT AUTO_INCREMENT PRIMARY KEY,
    id_gm int not null,
    nombre VARCHAR(100) NOT NULL,
    vida_util_dias INT NOT NULL,
    descripcion TEXT,
    foreign key (id_gm) references grupos_mixtos(id_gm)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

---------------------------------------------------------
-- 4. COSECHAS (FASE 1)
---------------------------------------------------------
CREATE TABLE cosechas (
    id_cosecha INT AUTO_INCREMENT PRIMARY KEY,
    serie_cosecha VARCHAR(50) NOT NULL UNIQUE,
    id_alimento INT NOT NULL,
    id_agricultor INT NOT NULL,
    id_comerciante int not null,
    fecha_siembra DATE NOT NULL,
    cantidad_sembrada INT NOT NULL,
    humedad_actual FLOAT,
    estado_actual ENUM('sembrado','creciendo','cosechado','almacenado') DEFAULT 'sembrado',

    FOREIGN KEY (id_alimento) REFERENCES alimentos(id_alimento),
    FOREIGN KEY (id_agricultor) REFERENCES agricultores(id_agricultor),
    FOREIGN KEY (id_comerciante) REFERENCES comerciantes(id_comerciante)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Lecturas de sensores
CREATE TABLE datos_cosechas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cosecha INT NOT NULL,
    temperatura FLOAT,
    humedad FLOAT,
    ph float,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_cosecha) REFERENCES cosechas(id_cosecha)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

---------------------------------------------------------
-- 5. FASE 2 — ALMACENAMIENTO
---------------------------------------------------------
create table cuartos_alm(
	id_cuarto int auto_increment primary key,
	serie VARCHAR(100) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE almacenamiento (
    id_almacenamiento INT AUTO_INCREMENT PRIMARY KEY,
    id_cuarto int NOT NULL,
    id_cosecha INT NOT NULL,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NULL,
    estado_ambiente VARCHAR(255),
    temperatura FLOAT,
    humedad FLOAT,
    gases FLOAT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    
	FOREIGN KEY (id_cuarto) REFERENCES cuartos_alm(id_cuarto)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE cuarto_lectura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_almacenamiento INT NOT NULL,
	estado_ambiente VARCHAR(255),
    temperatura FLOAT,
    humedad FLOAT,
    gases FLOAT,

    FOREIGN KEY (id_almacenamiento) REFERENCES almacenamiento(id_almacenamiento)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

---------------------------------------------------------
-- 6. FASE 3 — CONSUMO Y EXPIRACIÓN
---------------------------------------------------------
CREATE TABLE consumo_cosecha (
    id_consumo INT AUTO_INCREMENT PRIMARY KEY,
    id_cosecha INT NOT NULL,
    fecha_estim_expiracion DATE NOT NULL,
    temperatura FLOAT,
    peso_actual FLOAT,
    desperdicio_estimado FLOAT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_cosecha) REFERENCES cosechas(id_cosecha)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

---------------------------------------------------------
-- 1. GRUPOS MIXTOS
---------------------------------------------------------
INSERT INTO grupos_mixtos (grupo, tipo, descripcion)
VALUES
('Vegetales Base', 'verdura', 'Grupo de verduras comunes'),
('Frutas Dulces', 'fruta', 'Grupo de frutas de temporada');

---------------------------------------------------------
-- 2. ALIMENTOS
---------------------------------------------------------
INSERT INTO alimentos (id_gm, nombre, vida_util_dias, descripcion)
VALUES
-- Verduras
(1, 'Cebolla', 30, 'Cebolla blanca de cultivo orgánico'),
(1, 'Zanahoria', 20, 'Zanahoria fresca y crujiente'),
(1, 'Tomate', 10, 'Tomate rojo maduro'),

-- Frutas
(2, 'Manzana', 25, 'Manzana roja dulce'),
(2, 'Uva', 7, 'Uva morada de mesa');

---------------------------------------------------------
-- 3. USUARIOS
---------------------------------------------------------

-- ADMIN
INSERT INTO usuarios (nombre, apellido_p, apellido_m, email, password, telefono, ubicacion, tipo_usuario)
VALUES
('Carlos', 'Gómez', 'Ruiz', 'admin@foodsense.com', 'admin123', '5533221100', 'CDMX', 'admin');

INSERT INTO admins (id_admin) VALUES (1);

---------------------------------------------------------
-- AGRICULTORES
---------------------------------------------------------
INSERT INTO usuarios (nombre, apellido_p, apellido_m, email, password, telefono, ubicacion, tipo_usuario)
VALUES
('María', 'López', 'Vega', 'maria@campo.com', 'pass123', '5588997744', 'Toluca', 'agricultor'),
('Jorge', 'Díaz', 'Martínez', 'jorge@campo.com', 'pass123', '5577441122', 'Puebla', 'agricultor');

INSERT INTO agricultores (id_agricultor, contacto)
VALUES
(2, 'María López – 5588997744'),
(3, 'Jorge Díaz – 5577441122');

---------------------------------------------------------
-- COMERCIANTES
---------------------------------------------------------
INSERT INTO usuarios (nombre, apellido_p, apellido_m, email, password, telefono, ubicacion, tipo_usuario)
VALUES
('Lucía', 'Hernández', 'Ríos', 'lucia@mercado.com', 'abc123', '5599881122', 'CDMX Centro', 'comerciante'),
('Pedro', 'Salas', 'García', 'pedro@mercado.com', 'abc123', '5511998844', 'Querétaro', 'comerciante');

INSERT INTO comerciantes (id_comerciante, negocio, correo_negocio)
VALUES
(4, 'Frutas Selectas Lucía', 'ventas@luciafrutas.com'),
(5, 'Mercado Los Hermanos', 'contacto@loshermanos.com');

---------------------------------------------------------
-- 4. COSECHAS (FASE 1)
---------------------------------------------------------
INSERT INTO cosechas (
    serie_cosecha, id_alimento, id_agricultor, id_comerciante,
    fecha_siembra, cantidad_sembrada, humedad_actual, estado_actual
)
VALUES
('C-1001', 1, 2, 4, '2025-01-05', 250, 55, 'sembrado'),       -- Cebolla
('C-1002', 2, 2, 5, '2025-01-08', 300, 60, 'creciendo'),     -- Zanahoria
('C-1003', 3, 3, 4, '2025-01-10', 180, 58, 'sembrado'),      -- Tomate
('C-1004', 4, 3, 5, '2025-01-12', 150, 62, 'creciendo'),     -- Manzana
('C-1005', 5, 2, 4, '2025-01-14', 200, 65, 'sembrado');      -- Uva

---------------------------------------------------------
-- 5. DATOS DE SENSORES (FASE 1)
---------------------------------------------------------
INSERT INTO datos_cosechas (id_cosecha, temperatura, humedad, ph)
VALUES
(1, 20.5, 55, 6.2),
(1, 21.0, 56, 6.1),

(2, 18.0, 60, 6.5),
(2, 18.5, 61, 6.6),

(3, 24.0, 58, 6.3),
(3, 24.5, 59, 6.4),

(4, 10.0, 62, 3.8),
(4, 11.0, 63, 3.9),

(5, 12.0, 65, 3.4),
(5, 12.5, 66, 3.5);

---------------------------------------------------------
-- 6. CUARTOS DE ALMACENAMIENTO
---------------------------------------------------------
INSERT INTO cuartos_alm (serie)
VALUES
('CA-01'),
('CA-02');

---------------------------------------------------------
-- 7. ALMACENAMIENTO (FASE 2)
---------------------------------------------------------
INSERT INTO almacenamiento (
    id_cuarto, id_cosecha, fecha_entrada,
    estado_ambiente, temperatura, humedad, gases
)
VALUES
(1, 1, '2025-01-20', 'Seco y estable', 4.5, 72, 0.8),    -- cebolla
(1, 3, '2025-01-22', 'Frío moderado', 6.0, 70, 1.2),     -- tomate
(2, 4, '2025-01-25', 'Controlado', 3.5, 80, 0.5);        -- manzana

---------------------------------------------------------
-- 8. LECTURAS DE CUARTO
---------------------------------------------------------
INSERT INTO cuarto_lectura (id_almacenamiento, estado_ambiente, temperatura, humedad, gases)
VALUES
(1, 'Seco estable', 4.6, 73, 0.7),
(1, 'Seco estable', 4.4, 72, 0.9),

(2, 'Frío controlado', 6.2, 69, 1.1),

(3, 'Húmedo', 3.6, 81, 0.6),
(3, 'Húmedo', 3.4, 80, 0.4);

---------------------------------------------------------
-- 9. FASE 3 — CONSUMO Y EXPIRACIÓN
---------------------------------------------------------
INSERT INTO consumo_cosecha (
    id_cosecha, fecha_estim_expiracion, temperatura, peso_actual, desperdicio_estimado
)
VALUES
(1, '2025-02-10', 4.5, 130.0, 5.5),   -- cebolla
(3, '2025-01-28', 6.0, 80.0, 3.0),    -- tomate
(4, '2025-01-30', 4.0, 90.0, 4.0);    -- manzana
