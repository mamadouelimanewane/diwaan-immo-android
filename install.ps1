# Installation Rapide - Script PowerShell
# Exécutez ce fichier pour installer automatiquement

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALLATION DIWAAN - PACKAGES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si on est dans le bon dossier
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: fichier package.json non trouvé" -ForegroundColor Red
    Write-Host "Assurez-vous d'être dans c:\gravity\zillow-clone" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "📦 Dossier du projet détecté: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Demander quel type d'installation
Write-Host "Choisissez le type d'installation:" -ForegroundColor Yellow
Write-Host "1. Minimal (jsPDF seulement - 30 sec) [RECOMMANDÉ]" -ForegroundColor Green
Write-Host "2. Standard (jsPDF + Resend - 1 min)" -ForegroundColor Cyan
Write-Host "3. Complet (Tous les packages - 2-3 min)" -ForegroundColor Magenta
Write-Host "4. Annuler" -ForegroundColor Red
Write-Host ""

$choice = Read-Host "Votre choix (1-4)"

switch ($choice) {
    1 {
        Write-Host ""
        Write-Host "📥 Installation MINIMALE..." -ForegroundColor Green
        Write-Host "Package: jsPDF" -ForegroundColor Cyan
        npm install jspdf
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Installation réussie!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Fonctionnalités activées:" -ForegroundColor Yellow
            Write-Host "  ✓ Génération PDF professionnelle" -ForegroundColor Green
            Write-Host "  ✓ Factures et reçus" -ForegroundColor Green
            Write-Host ""
            Write-Host "Prochaine étape: Redémarrez le serveur (npm run dev)" -ForegroundColor Cyan
        } else {
            Write-Host ""
            Write-Host "❌ Erreur lors de l'installation" -ForegroundColor Red
        }
    }
    
    2 {
        Write-Host ""
        Write-Host "📥 Installation STANDARD..." -ForegroundColor Cyan
        Write-Host "Packages: jsPDF, Resend" -ForegroundColor Cyan
        npm install jspdf resend
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Installation réussie!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Fonctionnalités activées:" -ForegroundColor Yellow
            Write-Host "  ✓ Génération PDF" -ForegroundColor Green
            Write-Host "  ✓ Email automatique (nécessite API key)" -ForegroundColor Green
            Write-Host ""
            Write-Host "Configuration requise:" -ForegroundColor Yellow
            Write-Host "  1. Créer compte sur https://resend.com" -ForegroundColor Cyan
            Write-Host "  2. Ajouter RESEND_API_KEY dans .env.local" -ForegroundColor Cyan
        } else {
            Write-Host ""
            Write-Host "❌ Erreur lors de l'installation" -ForegroundColor Red
        }
    }
    
    3 {
        Write-Host ""
        Write-Host "📥 Installation COMPLÈTE..." -ForegroundColor Magenta
        Write-Host "Packages: jsPDF, Resend, Twilio, GoogleAPIs" -ForegroundColor Magenta
        Write-Host "⏱️  Cela peut prendre 2-3 minutes..." -ForegroundColor Yellow
        Write-Host ""
        npm install jspdf resend twilio googleapis
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Installation complète réussie!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Fonctionnalités disponibles:" -ForegroundColor Yellow
            Write-Host "  ✓ PDF professionnel" -ForegroundColor Green
            Write-Host "  ✓ Email automatique" -ForegroundColor Green
            Write-Host "  ✓ WhatsApp Business" -ForegroundColor Green
            Write-Host "  ✓ Google Drive" -ForegroundColor Green
            Write-Host ""
            Write-Host "📖 Consultez docs/IMPLEMENTATION_AVANCEE.md pour la configuration" -ForegroundColor Cyan
        } else {
            Write-Host ""
            Write-Host "❌ Erreur lors de l'installation" -ForegroundColor Red
        }
    }
    
    4 {
        Write-Host "Installation annulée." -ForegroundColor Yellow
        exit
    }
    
    default {
        Write-Host "Choix invalide. Installation annulée." -ForegroundColor Red
        exit
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
pause
