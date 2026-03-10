<?php
/**
 * Newsletter Subscription Handler
 * 
 * Receives email from newsletter form, saves to CSV subscriber list,
 * sends notification to contact@datacendia.com, and sends welcome email
 * to the subscriber.
 *
 * Deployed to: /api/subscribe.php on Namecheap hosting
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://datacendia.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Honeypot check (bot trap)
if (!empty($_POST['_gotcha'])) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$source = htmlspecialchars(trim($_POST['source'] ?? 'newsletter'));
$lang = htmlspecialchars(trim($_POST['lang'] ?? 'en'));
$timestamp = date('Y-m-d H:i:s T');

// --- Save to subscriber CSV ---
$csvDir = __DIR__ . '/../data';
if (!is_dir($csvDir)) {
    mkdir($csvDir, 0755, true);
}
$csvFile = $csvDir . '/subscribers.csv';

// Check for duplicate
$isDuplicate = false;
if (file_exists($csvFile)) {
    $existing = file_get_contents($csvFile);
    if (strpos($existing, $email) !== false) {
        $isDuplicate = true;
    }
}

if (!$isDuplicate) {
    // Add header if new file
    if (!file_exists($csvFile)) {
        file_put_contents($csvFile, "email,source,language,subscribed_at\n");
    }
    file_put_contents($csvFile, "$email,$source,$lang,$timestamp\n", FILE_APPEND | LOCK_EX);
}

// --- Notify contact@datacendia.com ---
$notifyTo = 'contact@datacendia.com';
$notifySubject = $isDuplicate 
    ? "[Datacendia] Returning subscriber: $email" 
    : "[Datacendia] New subscriber: $email";
$notifyBody = "New newsletter subscription:\n\n"
    . "Email: $email\n"
    . "Source: $source\n"
    . "Language: $lang\n"
    . "Time: $timestamp\n"
    . ($isDuplicate ? "\n(Already subscribed — duplicate submission)\n" : "")
    . "\n---\nTotal subscribers: " . (file_exists($csvFile) ? count(file($csvFile)) - 1 : 1);

$notifyHeaders = "From: noreply@datacendia.com\r\n"
    . "Reply-To: $email\r\n"
    . "X-Mailer: Datacendia/1.0";

mail($notifyTo, $notifySubject, $notifyBody, $notifyHeaders);

// --- Send welcome email to subscriber ---
if (!$isDuplicate) {
    $welcomeSubject = "Welcome to Datacendia";
    $welcomeBody = <<<EOT
Thank you for subscribing to Datacendia updates.

You'll receive:
- Platform updates and new capability announcements
- Compliance guides and regulatory analysis
- Industry case studies and decision governance insights

One email per month, maximum. No spam. Unsubscribe anytime by replying "unsubscribe".

---

Datacendia — Decision Crisis Immunization Infrastructure
https://datacendia.com

Questions? Reply to this email or contact us at contact@datacendia.com
EOT;

    $welcomeHeaders = "From: Datacendia <contact@datacendia.com>\r\n"
        . "Reply-To: contact@datacendia.com\r\n"
        . "X-Mailer: Datacendia/1.0";

    mail($email, $welcomeSubject, $welcomeBody, $welcomeHeaders);
}

echo json_encode([
    'ok' => true,
    'message' => $isDuplicate ? 'Already subscribed' : 'Subscribed successfully'
]);
