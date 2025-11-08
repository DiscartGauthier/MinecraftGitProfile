import window from './config.js';
const gitUrl = "https://api.github.com/users/" + window.GitHubUsername + "/repos"
const gitUrlRepos = "https://api.github.com/repos/" + window.GitHubUsername +"/"
const minseskinUrl = "https://mineskin.eu/helm/"+ window.MinecraftUsername +"/100.png"

// Il faudrait faire le moins d'appel à l'API possible donc je dirait qu'on peut en faire 3
// 1 pour reprendre directement le nom (name)de chaque repos ainsi que le nombre de Star (stargazers_count), la taille (size), le language (language), le nombre de fork (forks_count)
// Pour ce qui est du nombre de contributeur ou du nombre de commit il faut faire une requête pour chaque repos mais en changeant le endpoint pour ce qui est de contributeur mettre (https://api.github.com/repos/DiscartGauthier/a-delete/contributors), et pour les commits (https://api.github.com/repos/DiscartGauthier/a-delete/commits)
//En gros t'auras [[name, stars, contributors, commits, language, size, forks], [name2, stars, contributors, commits, language, size, forks], [name3, stars, contributors, commits, language, size, forks]]
//À mon avis je vais pas utiliser tout les retrieves je vais mettre en instant le nom, star, taille, langue, forks et puis for each et mettre directement la bonne chose et là les retrieve


let cornerHead = document.getElementById("Head");
cornerHead.setAttribute('src', minseskinUrl)
cornerHead.setAttribute('title', window.MinecraftUsername)


const repos = await getJson(gitUrl);
const arr = [];
let k=0;
for(const repo of repos) {
    //ira chercher les JSON pour contributors et Commits
    const commitsJson = await getJson(gitUrlRepos + repo.name + "/commits");
    const contributorsJson = await getJson(gitUrlRepos + repo.name + "/contributors");

    //reprends tout ce qu'il faut mettre dans la table
    const repoName = repo.name;
    const repostarsNumber = numberToString(repo.stargazers_count);
    const repoContributorsNumber = numberToString(contributorsJson.length);
    const repoCommitsNumber = numberToString(commitsJson.length);
    const repoLanguage = noMoreCaracter(repo.language);
    const repoSize = numberToString(repo.size);
    const repoForksNumber = numberToString(repo.forks_count);

    arr[k] = [repoName, repostarsNumber, repoContributorsNumber, repoCommitsNumber, repoLanguage, repoSize, repoForksNumber]
    k++;
}

let table = document.querySelector('#tbody');
//i va permettre de mettre ne muted (estompé) une ligne sur deux
let i = 1;
for (let subArr of arr) {
    let tr = document.createElement('tr');
    tr.classList.add('stat-row');
    
    //Va initialiser l'image au début de chaque repos
    let th = document.createElement('th');
    th.classList.add('row-icon');
    let dv = document.createElement('div');
    dv.classList.add('pix');
    let img = document.createElement('img');
    img.setAttribute('src', 'sprites/repos1.png');
    img.setAttribute('alt', 'Test');
    img.setAttribute('title', subArr[0])
    dv.appendChild(img);
    th.appendChild(dv);
    tr.appendChild(th);

    //Va initialiser les données dans chaque ligne de repos
    for (let j=1; j<=subArr.length; j++) {
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

//will have the url in parameter
async function getJson(url) {
    //will call the api and return the json
    const reponse = await fetch(url);
    const repos = await reponse.json();
    return repos;
}

//will check if the number is more than 999 and put K or M or G or T
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

//Va prendre en parametre un titre et il ne doit pas être plus long que 16 caractère aussi non il va mettre ...
function noMoreCaracter(string) {
    if(string == null)
        return "No code"
    let lastString = string;
    if(string.length > 16)
    {
        lastString = string.slice(0, 13) + "..."
    }
    return lastString;
}