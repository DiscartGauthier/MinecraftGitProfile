import window from './config.js';
const gitUrl = "https://api.github.com/users/" + window.GitHubUsername + "/repos"
const gitUrlRepos = "https://api.github.com/repos/" + window.GitHubUsername +"/"
const minseskinUrl = "https://mineskin.eu/helm/"+ window.MinecraftUsername +"/100.png"

// Il faudrait faire le moins d'appel à l'API possible donc je dirait qu'on peut en faire 3
// 1 pour reprendre directement le nom (name)de chaque repos ainsi que le nombre de Star (stargazers_count), la taille (size), le language (language), le nombre de fork (forks_count)
// Pour ce qui est du nombre de contributeur ou du nombre de commit il faut faire une requête pour chaque repos mais en changeant le endpoint pour ce qui est de contributeur mettre (https://api.github.com/repos/DiscartGauthier/a-delete/contributors), et pour les commits (https://api.github.com/repos/DiscartGauthier/a-delete/commits)
//En gros t'auras [[name, stars, contributors, commits, language, size, forks], [name2, stars, contributors, commits, language, size, forks], [name3, stars, contributors, commits, language, size, forks]]
//À mon avis je vais pas utiliser tout les retrieves je vais mettre en instant le nom, star, taille, langue, forks et puis for each et mettre directement la bonne chose et là les retrieve

//Test du Json
async function main() {


    let cornerHead = document.getElementById("Head");
    cornerHead.setAttribute('src', minseskinUrl)

    /*
    const repos = await getJson(gitUrl);
  
    for(const crepos of repos) {
        console.log(crepos.name, crepos.stargazers_count, crepos.size, crepos.language, crepos.forks_count);
        const commitsJson = await getJson(gitUrlRepos + crepos.name + "/commits");
        const CommitsNumber = commitsJson.length;
        console.log(CommitsNumber);
        const contributorsJson = await getJson(gitUrlRepos + crepos.name + "/contributors");
        const contributorsNumber = contributorsJson.length;
        console.log(contributorsNumber);
        const image = "sprites/repos1.png";
    }
*/
//Faire 2 trois choses, 1 si langue + grande que 16 caractère mettre ..., Tout mettre en '' string, 
    let arr = [[0, 1, 5, 'C++', 14786, 1], [0, 1, 10, 'null', 20, 0], ['100 Md', '000 Md', '000 Md', 'CSS', '410 Kd', '000 Md'], [0, 0, 0, 'coucou ndfv jeou...', 0, 0]];
    let table = document.querySelector('#tbody');

    let i = 1;
    for (let subArr of arr) {
        let tr = document.createElement('tr');
        tr.classList.add('stat-row');
        

        let th = document.createElement('th');
        th.classList.add('row-icon');
        let dv = document.createElement('div');
        dv.classList.add('pix');
        let img = document.createElement('img');
        img.setAttribute('src', 'sprites/repos1.png');
        img.setAttribute('alt', 'Test');
        dv.appendChild(img);
        th.appendChild(dv);
        tr.appendChild(th);

        for (let elem of subArr) {
            let td = document.createElement('td');
            td.classList.add('num');
            if(i%2 === 0) {
                td.classList.add('muted');
            }
            td.textContent = elem;
            tr.appendChild(td);
        }
        
        table.appendChild(tr);
        i++;
    }






}
main()






//-----------------Retrieve Function-----------------//

async function retrieveElementNumber(url) {
    const reponse = await fetch(url);
    const repos = await reponse.json();
    return repos;
}



//-------------------HELPERS--------------//

//will have the url in parameter
async function getJson(url) {
    //will call the api and return the json
    const reponse = await fetch(url);
    const repos = await reponse.json();
    return repos;
}
