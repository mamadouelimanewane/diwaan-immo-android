# Script simple de reset DB - Version CURL

Write-Host "RESET BASE DE DONNEES - VERSION SIMPLE" -ForegroundColor Cyan
Write-Host ""

# Trouvez votre URL Vercel principale
Write-Host "IMPORTANT: Collez l'URL actuelle de votre site Vercel" -ForegroundColor Yellow
Write-Host "Exemple: https://zillow-clone-XXXXX.vercel.app" -ForegroundColor Gray
Write-Host ""
$url = Read-Host "URL de votre site"

if ([string]::IsNullOrWhiteSpace($url)) {
    Write-Host "URL manquante. Abandon." -ForegroundColor Red
    exit
}

$token = "diwaan-admin-2024-secure-token-789xyz"
$apiUrl = "$url/api/admin/reset-db"

Write-Host ""
Write-Host "Appel API: $apiUrl" -ForegroundColor Gray
Write-Host ""

try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type"  = "application/json"
    }
    
    $response = Invoke-WebRequest -Uri $apiUrl -Method POST -Headers $headers -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        $data = $response.Content | ConvertFrom-Json
        
        Write-Host "=================================" -ForegroundColor Green
        Write-Host "SUCCES !" -ForegroundColor Green  
        Write-Host "=================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Proprietes supprimees: $($data.stats.deleted)" -ForegroundColor White
        Write-Host "Proprietes creees: $($data.stats.created)" -ForegroundColor White
        Write-Host "  - Locations: $($data.stats.locations) (200K - 750K FCFA)" -ForegroundColor White
        Write-Host "  - Ventes: $($data.stats.ventes)" -ForegroundColor White
        Write-Host ""
        Write-Host "Base de donnees mise a jour!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Testez: $url/rent" -ForegroundColor Cyan
    }
    
}
catch {
    Write-Host "=================================" -ForegroundColor Red
    Write-Host "ERREUR !" -ForegroundColor Red
    Write-Host "=================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Details: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Solutions possibles:" -ForegroundColor Cyan
    Write-Host "1. Verifiez que l'URL est correcte" -ForegroundColor White
    Write-Host "2. Verifiez que le token JETON_SECRET_ADMIN existe sur Vercel" -ForegroundColor White
    Write-Host "3. Attendez 30s que le deploiement Vercel soit pret" -ForegroundColor White
}

Write-Host ""
Write-Host "Termine." -ForegroundColor Gray
