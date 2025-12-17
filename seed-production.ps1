# Script pour Seed la Base MongoDB de PRODUCTION
# ⚠️ ATTENTION : Ceci va supprimer toutes les données de production !

Write-Host "`n========================================" -ForegroundColor Red
Write-Host "⚠️  SEED DE LA BASE DE PRODUCTION" -ForegroundColor Red  
Write-Host "========================================`n" -ForegroundColor Red

Write-Host "Ce script va :" -ForegroundColor Yellow
Write-Host "  1. Sauvegarder votre .env local" -ForegroundColor White
Write-Host "  2. Se connecter à MongoDB PRODUCTION (Vercel)" -ForegroundColor White
Write-Host "  3. Supprimer TOUTES les données de production" -ForegroundColor Red
Write-Host "  4. Insérer les bonnes données du seed.ts" -ForegroundColor Green
Write-Host "  5. Restaurer votre .env local`n" -ForegroundColor White

Write-Host "⚠️  IMPORTANT : Assurez-vous d'avoir :" -ForegroundColor Yellow
Write-Host "  - L'URL MongoDB de PRODUCTION depuis Vercel" -ForegroundColor White
Write-Host "  - Une sauvegarde de votre base actuelle si nécessaire`n" -ForegroundColor White

$continue = Read-Host "Voulez-vous continuer ? (OUI pour confirmer, autre pour annuler)"

if ($continue -ne "OUI") {
    Write-Host "`n❌ Opération annulée`n" -ForegroundColor Red
    exit 0
}

# Étape 1 : Sauvegarder .env local
Write-Host "`n📦 Sauvegarde de .env local..." -ForegroundColor Cyan
Copy-Item .env .env.backup.local -Force
Write-Host "✅ Sauvegarde créée : .env.backup.local`n" -ForegroundColor Green

# Étape 2 : Demander l'URL de production
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📋 RÉCUPÉRER L'URL MONGODB DE PRODUCTION" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "1. Allez sur https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Sélectionnez votre projet" -ForegroundColor White
Write-Host "3. Allez dans Settings > Environment Variables" -ForegroundColor White
Write-Host "4. Copiez la valeur de DATABASE_URL`n" -ForegroundColor White

$productionUrl = Read-Host "Collez ici l'URL MongoDB de PRODUCTION"

if ([string]::IsNullOrWhiteSpace($productionUrl)) {
    Write-Host "`n❌ URL non fournie. Opération annulée`n" -ForegroundColor Red
    Remove-Item .env.backup.local -Force
    exit 1
}

# Étape 3 : Créer un .env temporaire pour la production
Write-Host "`n🔧 Configuration de l'environnement de production..." -ForegroundColor Cyan

# Lire le .env actuel et remplacer DATABASE_URL
$envContent = Get-Content .env
$newEnvContent = $envContent -replace 'DATABASE_URL=.*', "DATABASE_URL=`"$productionUrl`""
$newEnvContent | Set-Content .env.temp.production

# Remplacer .env par le temp
Move-Item .env.temp.production .env -Force

Write-Host "✅ Environnement configuré pour PRODUCTION`n" -ForegroundColor Green

# Étape 4 : Reset et Seed
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "🗑️  RESET DE LA BASE DE PRODUCTION" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Yellow

try {
    npx prisma db push --force-reset --accept-data-loss
    
    if ($LASTEXITCODE -ne 0) {
        throw "Erreur lors du reset de la base"
    }
    
    Write-Host "`n✅ Base de production resetée`n" -ForegroundColor Green
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "🌱 SEED DE LA BASE DE PRODUCTION" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    npx prisma db seed
    
    if ($LASTEXITCODE -ne 0) {
        throw "Erreur lors du seed"
    }
    
    Write-Host "`n✅ Seed de production terminé avec succès !`n" -ForegroundColor Green
    
}
catch {
    Write-Host "`n❌ ERREUR : $($_.Exception.Message)`n" -ForegroundColor Red
    Write-Host "Restauration de l'environnement local...`n" -ForegroundColor Yellow
    Copy-Item .env.backup.local .env -Force
    Remove-Item .env.backup.local -Force
    exit 1
}

# Étape 5 : Restaurer .env local
Write-Host "🔄 Restauration de l'environnement local..." -ForegroundColor Cyan
Copy-Item .env.backup.local .env -Force
Remove-Item .env.backup.local -Force
Write-Host "✅ Environnement local restauré`n" -ForegroundColor Green

# Résumé
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ SUCCÈS COMPLET !" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "La base de données MongoDB de PRODUCTION a été :" -ForegroundColor White
Write-Host "  ✅ Vidée complètement" -ForegroundColor Green
Write-Host "  ✅ Remplie avec les bonnes données (14 propriétés)" -ForegroundColor Green
Write-Host "  ✅ Prête à l'emploi`n" -ForegroundColor Green

Write-Host "Prochaines étapes :" -ForegroundColor Cyan
Write-Host "  1. Attendez que Vercel finisse le déploiement" -ForegroundColor White
Write-Host "  2. Testez : https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app/rent" -ForegroundColor White
Write-Host "  3. Vérifiez que les prix sont corrects (100k-750k FCFA)`n" -ForegroundColor White

Write-Host "Appuyez sur ENTRÉE pour terminer..." -NoNewline
Read-Host
