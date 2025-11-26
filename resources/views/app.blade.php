<!DOCTYPE html>
<html>
<head>
<title>{{ config('app.name', 'Laravel') }}</title>
<link rel="preload" href="/fonts/ArTarumianBarakU-Regular.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="/fonts/ArTarumianBarakU-Bold.ttf" as="font" type="font/ttf" crossorigin>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @vite('resources/css/app.css')
</head>
<body>
    @inertia
</body>
</html>