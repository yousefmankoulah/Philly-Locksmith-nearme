<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

    // Check if all required fields are filled
    if ($email) {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Gmail SMTP host
            $mail->SMTPAuth = true;
            $mail->Username = 'carkeyslocksmith247@gmail.com'; // Your Gmail username
            $mail->Password = 'inrp wdss geqb idmr'; // Your Gmail password
            $mail->SMTPSecure = 'ssl'; // Enable TLS encryption; 'ssl' is also accepted
            $mail->Port = 465; // TCP port to connect to

            $mail->setFrom($email, $name);
            $mail->addAddress('carkeyslocksmith247@gmail.com');

            $mail->isHTML(false);
            $mail->Subject = "New quote requested";
            $mail->Body = "The Customer name: $name\nThe Customer Email: $email\nThe Customer Phone: $phone\nThe Message: $message";

            $mail->send();
            echo '<script>alert("Message sent successfully!");</script>';
        } catch (Exception $e) {
            echo '<script>alert("Failed to send message.");</script>';
        }
    } else {
        echo '<script>alert("Please fill in all required fields.");</script>';
    }
} else {
    echo json_encode(array("status" => "error", "message" => "<div style='color: red;'>Invalid request.</div>"));
}
?>