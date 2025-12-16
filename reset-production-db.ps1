# Script pour réinitialiser la base de données de PRODUCTION avec les prix corrects

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "RESET BASE DE DONNEES PRODUCTION" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$PRODUCTION_URL = "https://zillow-clone-3nck5w4q7-mamadou-dias-projects-979b1f4f.vercel.app"
$ADMIN_TOKEN = "diwaan-admin-2024-secure-token-789xyz"

Write-Host "URL Production: $PRODUCTION_URL" -ForegroundColor Gray
Write-Host "Token: $ADMIN_TOKEN" -ForegroundColor Gray
Write-Host ""

Write-Host "ATTENTION: Cette action va:" -ForegroundColor Yellow
Write-Host "  - SUPPRIMER toutes les proprietes existantes" -ForegroundColor Yellow
Write-Host "  - CREER 6 nouvelles proprietes avec prix corrects" -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "Voulez-vous continuer? (O/N)"

if ($confirmation -ne "O" -and $confirmation -ne "o") {
    Write-Host "Operation annulee." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Reinitialisation en cours..." -ForegroundColor Cyan

try {
    $headers = @{
        "Authorization" = "Bearer $ADMIN_TOKEN"
        "Content-Type"  = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri "$PRODUCTION_URL/api/admin/reset-db" -Method POST -Headers $headers
    
    Write-Host ""
    Write-Host "=================================" -ForegroundColor Green
    Write-Host "SUCCES !" -ForegroundColor Green
    Write-Host "=================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Resultats:" -ForegroundColor Cyan
    Write-Host "  - Proprietes supprimees: $($response.stats.deleted)" -ForegroundColor White
    Write-Host "  - Proprietes creees: $($response.stats.created)" -ForegroundColor White
    Write-Host "  - Locations: $($response.stats.locations) (200K - 750K FCFA)" -ForegroundColor White
    Write-Host "  - Ventes: $($response.stats.ventes)" -ForegroundColor White
    Write-Host ""
    Write-Host "Base de donnees de production mise a jour avec succes!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Testez maintenant sur:" -ForegroundColor Cyan
    Write-Host "  $PRODUCTION_URL/rent" -ForegroundColor White
    
}
catch {
    Write-Host ""
    Write-Host "=================================" -ForegroundColor Red
    Write-Host "ERREUR !" -ForegroundColor Red
    Write-Host "=================================" -ForegroundColor Red
    Write-Host ""
    
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Token admin incorrect ou manquant" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Solution:" -ForegroundColor Cyan
        Write-Host "  1. Allez sur Vercel: https://vercel.com" -ForegroundColor White
        Write-Host "  2. Variables d'environnement" -ForegroundColor White
        Write-Host "  3. Ajoutez: ADMIN_SECRET_TOKEN = $ADMIN_TOKEN" -ForegroundColor White
        Write-Host "  4. Redeployez" -ForegroundColor White
        Write-Host "  5. Reexecutez ce script" -ForegroundColor White
    }
    else {
        Write-Host "Erreur: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        Write-Host "Verifiez:" -ForegroundColor Yellow
        Write-Host "  - Connexion internet" -ForegroundColor White
        Write-Host "  - URL de production correcte" -ForegroundColor White  
        Write-Host "  - Base de donnees accessible" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "Termine." -ForegroundColor Gray
