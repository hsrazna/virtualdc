<?php
$sendto   = "admin@mail.ru";
$uname = $_POST['uname'];
$tel = $_POST['tel'];
// $text = $_POST['text'];
// $email =  $_POST['email'];
// $utm = $_POST['f-utm'];
// Формирование заголовка письма
$subject  = "Новое сообщение";
// $headers  = "From: " . strip_tags($usermail) . "\r\n";
// $headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body>";
$msg .= "<h2>Новое сообщение</h2>\r\n";

$msg .= "<p><strong>Телефон:</strong> ".$tel."</p>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$uname."</p>\r\n";
// $msg .= "<p><strong>Email:</strong> ".$email."</p>\r\n";
// $msg .= "<p><strong>Сообщение:</strong> ".$text."</p>\r\n";
// $msg .= "<p><strong>UTM-метка:</strong> ".$utm."</p>\r\n";

$msg .= "</body></html>";


// отправка сообщения
if(!@mail($sendto, $subject, $msg, $headers)) {
	//echo "true";
} else {
	//echo "false";
}

?>