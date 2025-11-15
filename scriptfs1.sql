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
INSERT INTO usuarios (nombre, apellido_p, apellido_m, email, password, telefono, ubicación, tipo_usuario)
VALUES
('Carlos', 'Gómez', 'Ruiz', 'admin@foodsense.com', 'admin123', '5533221100', 'CDMX', 'admin');

INSERT INTO admins (id_admin) VALUES (1);

---------------------------------------------------------
-- AGRICULTORES
---------------------------------------------------------
INSERT INTO usuarios (nombre, apellido_p, apellido_m, email, password, telefono, ubicación, tipo_usuario)
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
INSERT INTO usuarios (nombre, apellido_p, apellido_m, email, password, telefono, ubicación, tipo_usuario)
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
