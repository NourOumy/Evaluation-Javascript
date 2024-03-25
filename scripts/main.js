// intégrer des plugin

function myFetch (){

fetch(`https://api.example.com/data`) 
// (ligne qui pointe vers le service externe à qui on veut s’adresser)

// (méthode then ^pour gérer la réponse reçue en retour)
  .then(response => response.json()) 
//   ( 1) convertir en json : tableaux objets et clés et envoyer les données au .then suivant)
  .then(data => { 
    // (2) à partir des datas qu’on a converti, faire un console log poour voir ce qu’on a) récup
    console.log(data); 
    // (3) toutes la programmations se fait ici, qu’est ce que je vais en faire)
  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error); 
//   (4) si on a pas les droits ou on a fait une erreur, ça les retourne ici)
})

}

