<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$user = App\Models\User::where('correo', 'admin@isay.edu')->first();
$hash = $user->getAuthPassword();

echo "HASH: " . $hash . "\n";
echo "CHECK: " . (Hash::check('admin123', $hash) ? "YES" : "NO") . "\n";
echo "Attempt: " . (Auth::attempt(['correo'=>'admin@isay.edu', 'password'=>'admin123']) ? "YES" : "NO") . "\n";
