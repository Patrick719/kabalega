<?php
// php/process-application.php

header('Content-Type: application/json'); // Set the response type to JSON

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and assign POST data to variables
    $student_name = sanitize_input($_POST['student-name']);
    $dob = sanitize_input($_POST['dob']);
    $parent_name = sanitize_input($_POST['parent-name']);
    $parent_email = sanitize_input($_POST['parent-email']);
    $parent_phone = sanitize_input($_POST['parent-phone']);
    $previous_school = sanitize_input($_POST['previous-school']);
    $class_applying = sanitize_input($_POST['class-applying']);

    // --- Server-Side Validation ---
    if (empty($student_name) || empty($parent_email) || empty($parent_phone) || !filter_var($parent_email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid or missing required fields.']);
        exit;
    }

    // --- Database Insertion (Example) ---
    /*
    $db_host = 'localhost';
    $db_user = 'username';
    $db_pass = 'password';
    $db_name = 'kabalega_school_db';

    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO applications (student_name, dob, parent_name, parent_email, parent_phone, previous_school, class_applying) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $student_name, $dob, $parent_name, $parent_email, $parent_phone, $previous_school, $class_applying);
    
    if ($stmt->execute()) {
        // Proceed to send email
    } else {
        echo json_encode(['success' => false, 'message' => 'Error saving application.']);
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();
    $conn->close();
    */
    
    // --- Email Notification ---
    $to = "admissions@kabalegass.sc.ug"; // School's admissions email
    $subject = "New Student Application: " . $student_name;
    $email_body = "You have received a new online application.\n\n";
    $email_body .= "Student Name: $student_name\n";
    $email_body .= "Date of Birth: $dob\n";
    $email_body .= "Parent/Guardian Name: $parent_name\n";
    $email_body .= "Parent Email: $parent_email\n";
    $email_body .= "Parent Phone: $parent_phone\n";
    $email_body .= "Previous School: $previous_school\n";
    $email_body .= "Class Applying For: $class_applying\n";
    
    $headers = "From: noreply@kabalegass.sc.ug\r\n";
    $headers .= "Reply-To: $parent_email\r\n";

    // Use wordwrap() if lines are longer than 70 characters
    $email_body = wordwrap($email_body, 70);

    // Send email
    if (mail($to, $subject, $email_body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Application submitted successfully! We will contact you shortly.']);
    } else {
        // This part is tricky as mail() can return true even if mail isn't sent.
        // For a production system, use a library like PHPMailer.
        echo json_encode(['success' => false, 'message' => 'Application received, but we could not send a notification. Please contact us directly.']);
    }

} else {
    // Not a POST request
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>