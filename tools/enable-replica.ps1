$ErrorActionPreference = "Stop"

$cfgPath = "C:\Program Files\MongoDB\Server\8.2\bin\mongod.cfg"
$backupPath = "C:\Program Files\MongoDB\Server\8.2\bin\mongod.cfg.bak"

Write-Host "Vérification de la configuration MongoDB..."

try {
    $content = Get-Content $cfgPath -Raw
}
catch {
    Write-Error "Impossible de lire le fichier de configuration. Exécutez ce script en tant qu'administrateur."
    exit 1
}

if ($content -match "replSetName:\s*rs0") {
    Write-Host "Le fichier de configuration contient déjà 'replSetName: rs0'."
}
else {
    Write-Host "Modification du fichier de configuration..."
    
    # Backup
    try {
        Copy-Item $cfgPath $backupPath -Force
        Write-Host "Sauvegarde créée : $backupPath"
    }
    catch {
        Write-Warning "Impossible de créer la sauvegarde."
    }

    # Replace commented out #replication with the config
    # We look for "#replication:" and replace it with:
    # replication:
    #   replSetName: rs0
    
    if ($content -match "#replication:") {
        $newContent = $content -replace "#replication:", "replication:`r`n  replSetName: rs0"
    }
    else {
        # Fallback if not commented or different format, append to end if not present
        $newContent = $content + "`r`nreplication:`r`n  replSetName: rs0"
    }

    try {
        Set-Content -Path $cfgPath -Value $newContent -NoNewline
        Write-Host "Configuration mise à jour avec succès."
    }
    catch {
        Write-Error "Impossible d'écrire dans le fichier de configuration. ACCÈS REFUSÉ. Veuillez lancer PowerShell en tant qu'Administrateur."
        exit 1
    }

    Write-Host "Redémarrage du service MongoDB... (Garder les doigts croisés)"
    try {
        Restart-Service MongoDB -Force
        Write-Host "Service redémarré. Attente de 5 secondes..."
        Start-Sleep -Seconds 5
    }
    catch {
        Write-Error "Impossible de redémarrer le service MongoDB. Privilèges insuffisants."
        exit 1
    }
}

Write-Host "Initialisation du Replica Set..."
try {
    # Assuming node is in PATH and we are in project root
    node "tools/init-rs.js"
}
catch {
    Write-Error "Erreur lors de l'exécution du script d'initiation Node.js"
    exit 1
}

Write-Host "Terminé ! Essayez de vous inscrire à nouveau."
