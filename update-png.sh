#!/usr/bin/env bash
set -euo pipefail

# === CONFIG ===
REPO_DIR="/Users/g.discart/Desktop/Projet Perso/GitProfile/MinecraftGitProfile"   # <-- mets le chemin vers ton clone
BRANCH="main"                              # <-- ta branche
GITHUB_USERNAME="DiscartGauthier"          # <-- ton GitHub user
MINECRAFT_USERNAME="XGORATH_"       # <-- ton pseudo Minecraft
# ==============

cd "$REPO_DIR"

# S'assure d'être sur la bonne branche et à jour
git fetch origin
git checkout "$BRANCH"
git pull --rebase origin "$BRANCH"

# Installe deps si besoin (rapide si déjà ok)
if [ ! -d node_modules ]; then
  npm ci
fi

# Génère l'image
export GITHUB_USERNAME
export MINECRAFT_USERNAME
npm run generate:png

# Commit/push seulement si l'image a changé
git add exports/minecraft-stats.png

if git diff --cached --quiet; then
  echo "Aucun changement, rien à commit."
  exit 0
fi

git commit -m "chore: daily update minecraft-stats.png ($(date -Iseconds))"
git push origin "$BRANCH"

echo "OK: image générée + push."

