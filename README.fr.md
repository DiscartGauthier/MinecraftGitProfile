# Minecraft GitHubProfile Stats Panel

Un mini-outil front-end qui génère un panneau “style Minecraft” avec les statistiques publiques de vos dépôts GitHub, puis permet d’exporter le rendu en **PNG** pour l’insérer dans un README ou sur un profil.

<p align="right">
  <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.en.md">🇬🇧 English</a>
</p>

## Table des matières
- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Pré-requis](#pré-requis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Arborescence type](#arborescence-type)
- [Options & Personnalisation](#options--personnalisation)
- [Dépannage](#dépannage)
- [Crédits](#crédits)
- [Licence](#licence)

## Aperçu

- Un tableau des dépôts GitHub avec : **Stars**, **Contributors**, **Commits**, **Language**, **Size**, **Forks**, et une icône “tête” Minecraft en haut à gauche.
![Repo Statistics](https://github.com/user-attachments/assets/25cbb277-6c0d-4e53-a300-580fa65262e9)
- Si aucune image n’est associée à une ligne, vous pouvez **cliquer** sur l’image par défaut et **importer la vôtre** (GIF d’exemple possible).
![No img For that repo](https://github.com/user-attachments/assets/08275ada-0748-46ef-8dd5-6c2b5fc302ef)
- Un bouton **“Télécharger en PNG”** capture le panneau et enregistre l’image localement pour la coller dans votre README GitHub.

## Fonctionnalités

- UI pixel-art inspirée de Minecraft (police dédiée) et icônes pour les colonnes.
- Récupération des statistiques via l’API publique de GitHub pour un utilisateur donné.
- Icône de profil Minecraft alimentée par le pseudo configuré.
- Remplacement manuel des vignettes par **clic → sélection d’image**.
- Export **PNG** en un clic grâce à *html2canvas*.

## Pré-requis

- Un navigateur moderne (Chrome, Firefox, Edge, Safari).
- Un serveur web **statique** (facultatif mais recommandé pour éviter certains soucis de chargement). Exemples :
  - **MAMP** (macOS) / **WAMP** (Windows)
  - **Python** : `python3 -m http.server 5500`
  - **Node** : `npx serve` ou `npx http-server`

## Installation

1. Copiez les fichiers du projet dans un dossier accessible par votre serveur web.
2. Vérifiez les chemins des assets :
   - La page HTML référence la feuille de style sous `style/statistics.css` et charge `script/statistics.js` en module.
   - Assurez-vous que vos chemins et **casse des noms de fichiers** correspondent sur un système sensible à la casse (Linux).
3. Placez vos **sprites** dans `sprites/` (ex. `Star.png`, `Contribution.png`, etc.).

## Configuration

Modifiez `config.js` à la racine :

```js
const window = {
  GitHubUsername: 'VotrePseudoGitHub',
  MinecraftUsername: 'VotrePseudoMinecraft',
};

export default window;
```

- `GitHubUsername` : l’utilisateur dont vous voulez afficher les dépôts publics.
- `MinecraftUsername` : utilisé pour récupérer l’avatar Minecraft.

## Utilisation

1. Lancez le projet via **MAMP** (ou un autre serveur statique) et ouvrez la page `statistics.html`.
2. Patientez le chargement des données GitHub et des images.
3. (Optionnel) **Remplacez une image** : cliquez sur l’image par défaut d’une ligne, choisissez un fichier image local, il sera appliqué à la cellule correspondante.
4. Cliquez sur **_Télécharger en PNG_** : un fichier du type `minecraft-stats-<timestamp>.png` est généré.
5. Dans votre README GitHub, insérez l’image générée :
   ```md
   ![Mes Stats](./exports/minecraft-stats.png)
   ```
   ou uploadez-la dans un *Issue* / *Release* / *Assets* puis utilisez l’URL fournie.

## Arborescence type

```txt
.
├─ statistics.html
├─ script/
│  └─ statistics.js
├─ style/
│  └─ statistics.css
├─ sprites/
│  ├─ Star.png
│  ├─ Contribution.png
│  ├─ Commit.png
│  ├─ Code.png
│  ├─ Size.png
│  └─ Fork.png
├─ minecraft-font/
│  ├─ info.txt
│  ├─ MinecraftBold-nMK1.otf
│  ├─ MinecraftBoldItalic-1y1e.otf
│  ├─ MinecraftItalic-R8Mo.otf
│  └─ MinecraftRegular-Bmg3.otf
└─ config.js
```


## Options & Personnalisation

- **Sprites personnalisés** : cliquez une vignette pour téléverser votre propre icône par ligne.
- **Police** : la police “Minecraft” est chargée via `@font-face`. Vous pouvez changer de police ou d’emplacement dans la feuille de style.

## Dépannage

- **PNG vide ou incomplet** : attendez le chargement complet des images et ressayez. Certains navigateurs bloquent les captures d’images externes si elles ne sont pas servies via HTTP(S). Servez le projet depuis un petit serveur local.
- **Police non appliquée** : vérifiez le chemin vers `minecraft-font/MinecraftRegular-Bmg3.otf` et la correspondance du nom de famille `Minecraft`.
- **Données GitHub manquantes** : l’API publique de GitHub est soumise à des quotas (60 req/h sans authentification). Réessayez plus tard. À chaque chargement on aura 2n+1 requêtes où n est le nombre de repos publique que vous avez. Sauf que l'on va en chercher maximum 10 donc => 21 requêtes.

## Crédits

- **Police Minecraft** : `MinecraftRegular-Bmg3.otf` (domaine public). Voir `info.txt` et la page de la police pour plus d’informations.
- **html2canvas** pour la capture PNG.

## Licence

- **Code** : *Project License — Non-Commercial, No-Derivatives (PR-Only) v1.0*.  
  Utilisation et **redistribution à l’identique** autorisées **uniquement** à des fins **non-commerciales**.  
  **Aucun dérivé public** (forks **privés** autorisés uniquement pour préparer des **PR**).  
  **Attribution requise**. **Aucune garantie**.  
  Voir [LICENSE](./LICENSE) pour les conditions complètes.  
  Contributions sous **DCO** — voir [CONTRIBUTING.md](./CONTRIBUTING.md) et [DCO.txt](./DCO.txt).

- **Police** : “Minecraft” — **Domaine public**. Source :  
  <https://www.fontspace.com/minecraft-font-f28180> (voir `info.txt`).  
  *Remarque :* si vous chargez la police via un **CDN/hébergement tiers**, respectez les CGU de l’hébergeur.

---

> Astuces rapides :
> - Vous pouvez exécuter ce projet **sans build** (HTML+CSS+JS natifs).
> - MAMP est parfaitement adapté, mais n’importe quel serveur statique convient (Python/Node/VSCode Live Server, etc.).
> - Le bouton **Télécharger en PNG** exporte exactement ce qui est visible à l’écran : mettez la fenêtre à la taille voulue avant d’exporter.
