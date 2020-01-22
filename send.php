<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// работа с данным скриптом показана в видео на сайте http://rek9.ru/otpravka-zayavok-v-google-forms/
// формируем запись в таблицу google (изменить)
$url = "https://docs.google.com/forms/d/e/1FAIpQLSeXYcaFUPAlwXmd8aQSnkbawvb7uwx-kNWeSGdja563VDdemw/formResponse";

// сохраняем url, с которого была отправлена форма в переменную utm
$utm = $_SERVER["HTTP_REFERER"];
// ссылка для переадресации (изменить)
$link = "https://зарядное.бел";

// массив данных (изменить entry, draft и fbzx)
$post_data = array (
 "entry.1009098955" => $_POST['tovar'],
 "entry.145821032" => $_POST['phone'],
 "entry.1052576106" => $_POST['forma'],
"entry.476045853" => $_POST['price'], 
    "entry.1026890483" => $_POST['adress'],
     //"entry.1845349763" => $_POST['color'],
 "entry.1025544795" => $utm,
 "draftResponse" => "[null,null,&quot;-132362143068949170&quot;]",
 "pageHistory" => "0",
 "fbzx" => "-132362143068949170"
);

// Далее не трогать
// с помощью CURL заносим данные в таблицу google
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// указываем, что у нас POST запрос
curl_setopt($ch, CURLOPT_POST, 1);
// добавляем переменные
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
//заполняем таблицу google
$output = curl_exec($ch);
curl_close($ch);
sleep(5);
//перенаправляем браузер пользователя на скачивание оффера по нашей ссылке
header('Location: '.$link);
?>