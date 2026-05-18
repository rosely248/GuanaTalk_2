<?php
session_start();
include("conexion.php"); // Asegúrate que esté en la carpeta php/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Usamos usuarioID porque así aparece en tu phpMyAdmin
    $sql = "SELECT usuarioID, nombre, password FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($usuario = $result->fetch_assoc()) {
        // password_verify es obligatorio para contraseñas con hash
        if (password_verify($password, $usuario['password'])) {
            // Guardamos los datos en la sesión
            $_SESSION['usuario_id'] = $usuario['usuarioID'];
            $_SESSION['nombre'] = $usuario['nombre'];

            // Redirección a la HomePage (index.php)
            // Usamos ../ para salir de la carpeta 'php' y encontrar el archivo en la raíz
            header("Location: ../index.php");
            exit(); 
        } else {
            echo "La contraseña no coincide.";
        }
    } else {
        echo "Este correo no está registrado.";
    }
}
?>