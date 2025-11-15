<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "conexion.php";

/* ============================================================
   DEBUG opcional (útil para revisar lo que recibe el backend)
   Se guarda en: /foodsense360/backend/debug_register.log
============================================================ */
file_put_contents("debug_register.log", print_r($_POST, true));

/* ============================================================
   1. RECEPCIÓN Y NORMALIZACIÓN DE CAMPOS
============================================================ */
$nombre        = $_POST['nombre']        ?? '';
$apellido_p    = $_POST['apellido_p']    ?? '';
$apellido_m    = $_POST['apellido_m']    ?? '';
$email         = $_POST['email']         ?? '';
$password      = $_POST['password']      ?? '';
$telefono      = $_POST['telefono']      ?? '';
$ubicacion     = $_POST['ubicacion']     ?? null;  // SIN ACENTO
$userType      = $_POST['userType']      ?? '';

$contacto       = $_POST['contacto']       ?? null; // Agricultor
$negocio        = $_POST['negocio']        ?? null; // Comerciante
$correo_negocio = $_POST['correo_negocio'] ?? null; // Comerciante

/* ============================================================
   2. VALIDACIÓN DE CAMPOS OBLIGATORIOS
============================================================ */
if (!$nombre || !$apellido_p || !$apellido_m || !$email || !$password || !$telefono || !$userType) {
    echo json_encode([
        "success" => false,
        "message" => "Todos los campos obligatorios son requeridos"
    ]);
    exit;
}

// ADMIN NO SE REGISTRA
if ($userType === "admin") {
    echo json_encode([
        "success" => false,
        "message" => "Los administradores no pueden registrarse desde esta interfaz"
    ]);
    exit;
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Correo electrónico inválido"]);
    exit;
}

/* ============================================================
   3. HASH DE CONTRASEÑA
============================================================ */
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

/* ============================================================
   4. INSERTAR EN TABLA USUARIOS
============================================================ */
$stmt = $conn->prepare("
    INSERT INTO usuarios (nombre, apellido_p, apellido_m, email, password, telefono, ubicacion, tipo_usuario)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssss",
    $nombre,
    $apellido_p,
    $apellido_m,
    $email,
    $passwordHash,
    $telefono,
    $ubicacion,
    $userType
);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Error al registrar usuario: " . $stmt->error]);
    exit;
}

$id_usuario = $conn->insert_id;

/* ============================================================
   5. INSERTAR SEGÚN TIPO DE USUARIO
============================================================ */
if ($userType === "agricultor") {
    $stmt2 = $conn->prepare("
        INSERT INTO agricultores (id_agricultor, contacto)
        VALUES (?, ?)
    ");
    $stmt2->bind_param("is", $id_usuario, $contacto);
    $stmt2->execute();
}

if ($userType === "comerciante") {
    $stmt3 = $conn->prepare("
        INSERT INTO comerciantes (id_comerciante, negocio, correo_negocio)
        VALUES (?, ?, ?)
    ");
    $stmt3->bind_param("iss", $id_usuario, $negocio, $correo_negocio);
    $stmt3->execute();
}

/* ============================================================
   6. RESPUESTA FINAL
============================================================ */
echo json_encode([
    "success" => true,
    "message" => "Usuario registrado exitosamente",
    "id_usuario" => $id_usuario
]);

?>
