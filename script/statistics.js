const gitUrl = "https://api.github.com/users/DiscartGauthier/repos" //+ $gitUsername + "/repos"
const gitUrlRepos = "https://api.github.com/repos/DiscartGauthier/"

// Il faudrait faire le moins d'appel à l'API possible donc je dirait qu'on peut en faire 3
// 1 pour reprendre directement le nom (name)de chaque repos ainsi que le nombre de Star (stargazers_count), la taille (size), le language (language), le nombre de fork (forks_count)
// Pour ce qui est du nombre de contributeur ou du nombre de commit il faut faire une requête pour chaque repos mais en changeant le endpoint pour ce qui est de contributeur mettre (https://api.github.com/repos/DiscartGauthier/a-delete/contributors), et pour les commits (https://api.github.com/repos/DiscartGauthier/a-delete/commits)
//En gros t'auras [[name, stars, contributors, commits, language, size, forks], [name2, stars, contributors, commits, language, size, forks], [name3, stars, contributors, commits, language, size, forks]]
//À mon avis je vais pas utiliser tout les retrieves je vais mettre en instant le nom, star, taille, langue, forks et puis for each et mettre directement la bonne chose et là les retrieve

//Test du Json
async function main() {
    const repos = await getJson(gitUrl);
    //const test = JSON.parse(cc);
  
    for(const crepos of repos) {
        console.log(crepos.name, crepos.stargazers_count, crepos.size, crepos.language, crepos.forks_count);
        const commitsJson = await getJson(gitUrlRepos + crepos.name + "/commits");
        const CommitsNumber = commitsJson.length;
        console.log(CommitsNumber);
        const contributorsJson = await getJson(gitUrlRepos + crepos.name + "/contributors");
        const contributorsNumber = contributorsJson.length;
        console.log(contributorsNumber);
    }

  //console.log(test);

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
