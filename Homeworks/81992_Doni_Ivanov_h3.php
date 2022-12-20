<?php

function validate_form($name, $teacher, $description, $group, $credits) {

    $errors = array();

    if(strlen($name) < 2) {
        $errors['name'] = 'Името на учебния предмет трябва да бъде не по-малко от 2 символа';
    }

    if(strlen($name) > 150) {
        $errors['name'] = 'Името на учебния предмет трябва да бъде не повече от 150 символа';
    }
    
    if(strlen($teacher) < 3) {
        $errors['teacher'] = 'Името на преподавателя трябва да бъде не по-малко от 3 символа.';}

    if(strlen($teacher) > 200) {
        $errors['teacher'] = 'Името на преподавателя трябва да бъде не повече от 200 символа.';
    }

    if(strlen($description) < 10) {
        $errors['description'] = 'Описанието трябва да бъде не по-малко от 10 символа.';
    }

    if($group != 'М' && $group != 'ПМ' && $group != 'ОКН' && $group != 'ЯКН') {
        $errors['group'] = 'Групата трябва да бъде една от М, ПМ, ОКН и ЯКН.';
    }

    if($credits < 1) { 
        $errors['credits'] = 'Кредитите трябва да бъдат цяло положително число.';
    }

    return $errors;
}

if($_POST) {
    $name = $_POST['name'];
    $teacher = $_POST['teacher'];
    $description = $_POST['description'];
    $group = $_POST['group'];
    $credits = $_POST['credits'];

    $errors = validate_form($name, $teacher, $description, $group, $credits);

    if (!$errors) {
        echo json_encode(array('success' => 'true'), JSON_PRETTY_PRINT);
    }
    else {
        header('Content-type: text/javascript');
        echo json_encode(array('success' => 'false', 'errors' => $errors), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}

?>