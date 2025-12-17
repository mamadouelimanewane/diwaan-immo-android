# Script PowerShell pour mettre à jour les prix en production

Write-Host "Mise a jour des prix en production..." -ForegroundColor Cyan

$PRODUCTION_URL = "https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app"
$ADMIN_TOKEN = "diwaan-admin-2024-secure-token-789xyz"

Write-Host "URL Production: $PRODUCTION_URL"

try {
    Write-Host "Appel de l'API de mise a jour..."
    
    $headers = @{
        "Authorization" = "Bearer $ADMIN_TOKEN"
        "Content-Type"  = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri "$PRODUCTION_URL/api/admin/update-prices" -Method POST -Headers $headers
    
    Write-Host "SUCCES!" -ForegroundColor Green
    Write-Host "Message: $($response.message)"
    Write-Host "Proprietes mises a jour: $($response.updated)"
    Write-Host "Les loyers sont maintenant a jour en production!" -ForegroundColor Green
    
}
catch {
    Write-Host "ERREUR!" -ForegroundColor Red
    
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Token admin incorrect ou manquant" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Solution:"
        Write-Host "1. Allez sur Vercel: https://vercel.com/mamadou-dias-projects-979b1f4f/zillow-clone/settings/environment-variables"
        Write-Host "2. Ajoutez: ADMIN_SECRET_TOKEN = diwaan-admin-2024-secure-token-789xyz"
        Write-Host "3. Redeployez l'application"
        Write-Host "4. Reexecutez ce script"
    }
    else {
        Write-Host "Erreur: $($_.Exception.Message)"
    }
}

Write-Host "Termine."
