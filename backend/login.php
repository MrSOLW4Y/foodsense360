<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "conexion.php";

// 1️⃣ Recepción de datos
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
    echo json_encode([
        "status" => "error",
        "message" => "Faltan datos"
    ]);
    exit;
}

// 2️⃣ Buscar usuario por email
$sql = "SELECT id_usuario, nombre, password, tipo_usuario 
        FROM usuarios 
        WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuario no encontrado"
    ]);
    exit;
}

$user = $result->fetch_assoc();

// 3️⃣ Verificar contraseña
$passwordCorrecta = false;

if (password_verify($password, $user["password"])) {
    // Contraseña hasheada correcta
    $passwordCorrecta = true;
} elseif ($password === $user["password"]) {
    // Contraseña en texto plano correcta
    $passwordCorrecta = true;

    // Opcional: actualizar a hash BCRYPT automáticamente
    $nuevoHash = password_hash($password, PASSWORD_BCRYPT);
    $updateStmt = $conn->prepare("UPDATE usuarios SET password = ? WHERE id_usuario = ?");
    $updateStmt->bind_param("si", $nuevoHash, $user["id_usuario"]);
    $updateStmt->execute();
}

if (!$passwordCorrecta) {
    echo json_encode([
        "status" => "error",
        "message" => "Contraseña incorrecta"
    ]);
    exit;
}

// 4️⃣ Login exitoso
echo json_encode([
    "status" => "success",
    "id_usuario" => $user["id_usuario"],
    "nombre" => $user["nombre"],
    "tipo_usuario" => $user["tipo_usuario"]
]);
?>
