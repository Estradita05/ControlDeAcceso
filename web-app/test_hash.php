<?php
$hashFromDB = '$2b$12$D4OQGoMdlakmBHSdttSd5OWSbAQWvMtZYU7zLT1qyuq.T1RNwzWL.';
$hashForPhp = str_replace('$2b$', '$2y$', $hashFromDB);
echo password_verify('admin123', $hashForPhp) ? 'YES' : 'NO';
echo "\n";
