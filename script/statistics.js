import window from '../config.js';
const gitUrl = "https://api.github.com/users/" + window.GitHubUsername + "/repos"
const gitUrlRepos = "https://api.github.com/repos/" + window.GitHubUsername +"/"
const minseskinUrl = "https://mineskin.eu/helm/"+ window.MinecraftUsername +"/100.png"


// Help for the click on an image and input one
// Aide pour pouvoir cliquer sur une image et en mettre une
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.id = 'spriteUpload';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

let targetImg = null;

// In case a new image input it'll call this function
// En cas de nouveau input d'image il va appelé cette fonction
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const img = targetImg;

    // We will reset every things just in case
    // On reset le tout au cas où
    if (!file || !img) {
        e.target.value = '';
        targetImg = null;
        return;
    }

    const reader = new FileReader();

    reader.onload = (ev) => {
        // With ev we will take the image uploaded
        // Avec ev on prends l'image upload
        img.src = ev.target.result;
        img.classList.remove('NoData');
        // We'll reset after we changed it
        // On reset après l'avoir changer pour pouvoir le rechanger après
        e.target.value = '';
    };
    reader.readAsDataURL(file);

    targetImg = null;
});




//En gros t'auras [[name, stars, contributors, commits, language, size, forks], [name2, stars, contributors, commits, language, size, forks], [name3, stars, contributors, commits, language, size, forks]]
//À mon avis je vais pas utiliser tout les retrieves je vais mettre en instant le nom, star, taille, langue, forks et puis for each et mettre directement la bonne chose et là les retrieve

let cornerHead = document.getElementById("Head");
cornerHead.setAttribute('src', minseskinUrl)
cornerHead.setAttribute('title', window.MinecraftUsername)


const repos = await getJson(gitUrl);
const arr = [];
let k=0;
for(const repo of repos) {
    // 'll take the json for contributor et commit
    // Ira chercher les JSON pour contributors et Commits
    const contributorsJson = await getJson(gitUrlRepos + repo.name + "/contributors");
    // Will take every that it needs
    // Reprends tout ce qu'il faut mettre dans la table
    const repoName = repo.name;
    const repostarsNumber = numberToString(repo.stargazers_count);
    const repoContributorsNumber = numberToString(contributorsJson.length);
    let CommitsNumber = await getCommitCount(window.GitHubUsername ,repo.name);
    console.log(CommitsNumber);
    const repoCommitsNumber = numberToString(CommitsNumber);
    console.log(repoCommitsNumber);
    const repoLanguage = noMoreCaracter(repo.language, 16);
    const repoSize = numberToString(repo.size);
    const repoForksNumber = numberToString(repo.forks_count);

    arr[k] = [repoName, repostarsNumber, repoContributorsNumber, repoCommitsNumber, repoLanguage, repoSize, repoForksNumber]
    k++;
    if (k >= 10)
        break;
}
/*
  For the Test to not make request every time
  Pour faire les tests pour ne pas faire de requête à chaque fois
const arr = [];
arr[0] = ["a-delete", "0", "1", "5", "C++", "14 K", "1"]
arr[1] = ["DiscartGauthier", "0", "1", "10", "No code", "20", "0"]
arr[2] = ["MinecraftGitProfile", "0", "1", "16", "JavaScriptazr...", "47", "0"]
arr[3] = ["UnNom", "0", "1", "16", "C#", "47", "0"]
arr[4] = ["Cocouc", "0", "1", "16", "C#", "47", "0"]
*/

let table = document.querySelector('#tbody');
// i will make each two line in muted
// i va permettre de mettre ne muted (estompé) une ligne sur deux
let i = 1;
for (let subArr of arr) {
    let tr = document.createElement('tr');
    tr.classList.add('stat-row');
    
    // Will initiate the image in each row
    // Va initialiser l'image au début de chaque repos
    let th = document.createElement('th');
    th.classList.add('row-icon');
    let dv = document.createElement('div');
    dv.classList.add('pix');
    let img = document.createElement('img');

    const imageRepoE = await fetch("./sprites/" + subArr[0] + ".png");
    // Here it'll check if the image exist or not
    // Ici il va check si on a ou pas l'image qui va
    if (!imageRepoE.ok) {
        // If the image don't work it'll put a default img and add a click to modify
        // Si non, on mets l'image par défaut et lui donne de quoi changer en cas de click
        img.src = 'sprites/Default.png';
        img.classList.add('NoData');
        img.title = 'Clique pour mettre une image';
        img.style.cursor = 'pointer';

        img.addEventListener('click', () => {
            targetImg = img;
            fileInput.click();
        });
    } else {
        img.src = 'sprites/' + subArr[0] + '.png';
    }


    img.setAttribute('alt', 'Icône du dépôt');
    img.setAttribute('title', subArr[0]);
    let p = document.createElement('p');
    p.classList.add('NameRepo');
    p.textContent = noMoreCaracter(subArr[0], 19);
    dv.appendChild(img);
    th.appendChild(dv);
        th.appendChild(p);

    tr.appendChild(th);


    // Will init the data for each row
    // Va initialiser les données dans chaque ligne de repos
    for (let j=1; j < subArr.length; j++) {
        let td = document.createElement('td');
        td.classList.add('num');
        if(i%2 === 0) {
            td.classList.add('muted');
        }
        td.textContent = subArr[j];
        tr.appendChild(td);
    }
    
    table.appendChild(tr);
    i++;
}


//-------------------HELPERS--------------//

// Will have the url in parameter and return the json
// Va prendre en paramètre une url et retourner le json trouver
async function getJson(url) {
    // Will call the api and return the json
    // Va appeler l'api et retourner un json
    const reponse = await fetch(url);
    const repos = await reponse.json();
    return repos;
}

// Will check if the number is more than 999 and put K or M or G or T and will show 3 numbers every time
// Va vérifier si le nombre est plus grand que 999 et va y mettre un K, M, G ou T et va montrer 3 chiffres à chauqe fois
function numberToString(number) {
    let string;
    if(number < 1000)
    {
        string = String(number);
    }
    else if (number < 1000000)
    {
        string = String(Math.floor(number/1000));
        string = string + " K";
    }
    else if (number < 1000000000)
    {
        string = String(Math.floor(number/1000000));
        string = string + " M";
    }
    else if (number < 1000000000000)
    {       
        string = String(Math.floor(number/1000000000));
        string = string + " G";
    }    
    else
    {
        string = String(Math.floor(number/1000000000000));
        string = string + " T";
    }
    return string;
}

// Will take in parameter a title and a size and It can't be longer than size-3 carac otherwise it will put ...
// Va prendre en parametre un titre et une taille et il ne doit pas être plus long que taille-3 caractère aussi non il va mettre ...
function noMoreCaracter(string, maxsize) {
    if(string == null)
        return "No code"
    let lastString = string;
    if(string.length > maxsize)
    {
        lastString = string.slice(0, maxsize-3) + "..."
    }
    return lastString;
}

const downloadBtn = document.getElementById('downloadStats');

if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
        const panel = document.querySelector('.stats-panel');
        if (!panel) return;

        const canvas = await html2canvas(panel, {
            scale: 2,
            useCORS: true
        });

        // Converting in PNG + download
        // Conversion en PNG + téléchargement
        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `minecraft-stats-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}



async function getCommitCount(owner, repoName) {
  const perPage = 100;
  let page = 1;
  let total = 0;

  while (true) {
    const url = `https://api.github.com/repos/${owner}/${repoName}/commits?per_page=${perPage}&page=${page}`;
    const commits = await getJson(url);

    if (!Array.isArray(commits)) {
      console.error("GitHub error:", commits);
      break;
    }

    total += commits.length;
    if (commits.length < perPage) break;
    page++;
  }

  return total;
}
