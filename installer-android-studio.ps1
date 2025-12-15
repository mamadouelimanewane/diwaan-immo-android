# Script PowerShell pour installer Android Studio et générer l'APK
# Exécutez ce script en tant qu'Administrateur

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   INSTALLATION ANDROID STUDIO & GÉNÉRATION APK" -ForegroundColor Cyan
Write-Host "   Diwaan Immo - Application Android" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour télécharger Android Studio
function Download-AndroidStudio {
    Write-Host "[1/4] Téléchargement d'Android Studio..." -ForegroundColor Yellow
    
    $url = "https://redirector.gvt1.com/edgedl/android/studio/install/2023.1.1.28/android-studio-2023.1.1.28-windows.exe"
    $output = "$env:TEMP\android-studio-installer.exe"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
        Write-Host "✓ Téléchargement terminé : $output" -ForegroundColor Green
        return $output
    }
    catch {
        Write-Host "✗ Erreur de téléchargement : $_" -ForegroundColor Red
        return $null
    }
}

# Fonction pour installer Android Studio
function Install-AndroidStudio {
    param($installerPath)
    
    Write-Host "[2/4] Installation d'Android Studio..." -ForegroundColor Yellow
    Write-Host "   Cette étape peut prendre 10-15 minutes." -ForegroundColor Gray
    
    try {
        Start-Process -FilePath $installerPath -Wait -ArgumentList "/S"
        Write-Host "✓ Android Studio installé avec succès !" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ Erreur d'installation : $_" -ForegroundColor Red
        return $false
    }
}

# Fonction pour ouvrir Android Studio
function Open-AndroidStudio {
    Write-Host "[3/4] Ouverture du projet dans Android Studio..." -ForegroundColor Yellow
    
    $projectPath = "C:\gravity\zillow-clone"
    
    try {
        Set-Location $projectPath
        npx cap open android
        Write-Host "✓ Android Studio lancé !" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Impossible d'ouvrir Android Studio : $_" -ForegroundColor Red
    }
}

# Fonction principale
function Main {
    Write-Host "Que voulez-vous faire ?" -ForegroundColor Cyan
    Write-Host "1. Télécharger et installer Android Studio automatiquement" -ForegroundColor White
    Write-Host "2. J'ai déjà Android Studio, ouvrir le projet directement" -ForegroundColor White
    Write-Host "3. Afficher les alternatives (sans Android Studio)" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Votre choix (1/2/3)"
    
    switch ($choice) {
        "1" {
            $installer = Download-AndroidStudio
            if ($installer) {
                $success = Install-AndroidStudio -installerPath $installer
                if ($success) {
                    Write-Host ""
                    Write-Host "================================================" -ForegroundColor Green
                    Write-Host "   Installation terminée !" -ForegroundColor Green
                    Write-Host "================================================" -ForegroundColor Green
                    Write-Host ""
                    Write-Host "PROCHAINES ÉTAPES :" -ForegroundColor Yellow
                    Write-Host "1. Ouvrez Android Studio" -ForegroundColor White
                    Write-Host "2. Ouvrez le projet : C:\gravity\zillow-clone\android" -ForegroundColor White
                    Write-Host "3. Attendez la synchronisation Gradle" -ForegroundColor White
                    Write-Host "4. Build → Build APK(s)" -ForegroundColor White
                    Write-Host ""
                    Write-Host "Ou exécutez cette commande :" -ForegroundColor Yellow
                    Write-Host "   npx cap open android" -ForegroundColor Cyan
                }
            }
        }
        "2" {
            Open-AndroidStudio
            Write-Host ""
            Write-Host "DANS ANDROID STUDIO :" -ForegroundColor Yellow
            Write-Host "1. Attendez 'Gradle Sync' (barre en bas)" -ForegroundColor White
            Write-Host "2. Menu Build → Build Bundle(s) / APK(s) → Build APK(s)" -ForegroundColor White
            Write-Host "3. Attendez la compilation (~2-3 min)" -ForegroundColor White
            Write-Host "4. Cliquez sur 'locate' pour trouver l'APK" -ForegroundColor White
            Write-Host ""
            Write-Host "EMPLACEMENT DE L'APK :" -ForegroundColor Yellow
            Write-Host "   C:\gravity\zillow-clone\android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor Cyan
        }
        "3" {
            Write-Host ""
            Write-Host "ALTERNATIVES SANS ANDROID STUDIO :" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "Option 1 : GitHub Actions (GRATUIT)" -ForegroundColor Cyan
            Write-Host "   - Créez un repo GitHub" -ForegroundColor White
            Write-Host "   - Poussez le code" -ForegroundColor White
            Write-Host "   - L'APK sera généré automatiquement" -ForegroundColor White
            Write-Host "   - Workflow déjà créé : .github/workflows/build-apk.yml" -ForegroundColor Gray
            Write-Host ""
            Write-Host "Option 2 : Services en ligne" -ForegroundColor Cyan
            Write-Host "   - Expo EAS : https://expo.dev/" -ForegroundColor White
            Write-Host "   - App Center : https://appcenter.ms/" -ForegroundColor White
            Write-Host ""
            Write-Host "Consultez GENERER_APK_MAINTENANT.md pour les détails !" -ForegroundColor Green
        }
        default {
            Write-Host "Choix invalide." -ForegroundColor Red
        }
    }
}

# Exécution
Main

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Script terminé" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour plus d'aide, consultez :" -ForegroundColor Yellow
Write-Host "   - GENERER_APK_MAINTENANT.md" -ForegroundColor White
Write-Host "   - GUIDE_APK_ANDROID.md" -ForegroundColor White
Write-Host "   - COMMENT_GENERER_APK.md" -ForegroundColor White
