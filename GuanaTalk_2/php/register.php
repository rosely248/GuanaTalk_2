<?php 
    // Asegúrate de que conexion.php esté en la misma carpeta que este archivo (php/)
    include("conexion.php"); 

    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        // Validar que las contraseñas coincidan antes de procesar
        if ($_POST['password'] !== $_POST['confirm_password']) {
            die("Error: Las contraseñas no coinciden.");
        }

        $nombre = $_POST['nombre']; 
        $email = $_POST['email']; 
        // Encriptar contraseña
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT); 

        // Solo insertamos nombre, email y password. 
        // usuarioID se genera solo y rol se pone como 'usuario' automáticamente.
        $sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)"; 
        
        $stmt = $conn->prepare($sql); 
        
        if ($stmt) {
            $stmt->bind_param("sss", $nombre, $email, $password); 

            if ($stmt->execute()) { 
                echo "¡Usuario registrado correctamente en GuanaTalk!"; 
                // Opcional: Redirigir al login después de 2 segundos
                // header("refresh:2;url=../login.html");
            } else { 
                echo "Error al registrar: " . $stmt->error; 
            }
            $stmt->close();
        } else {
            echo "Error en la preparación de la consulta: " . $conn->error;
        }
    } 
    $conn->close();
?>