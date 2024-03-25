// variables *************************************
let lines_matchs = document.querySelector('.lines_matchs')
let teamDom = document.querySelector('.teamDom')
let teamGuest = document.querySelector('.teamGuest')
let buttons_quotes = document.querySelector('.buttons_quotes')
let choices = document.querySelector('.choices')
let domicileBtn = document.querySelector('.domicile')
let myTab =[]

// functions *************************************
function addTabLine (hometeam, awayteam, home_odd, draw_odd, away_odd){
  let tabLine = {
  domicile : hometeam,
  guest : awayteam,
  pariDomicile : home_odd,
  parinull : draw_odd,
  pariguest : away_odd,
  }
  myTab.push(tabLine)
  
}
// intégrer API
function myFetch (){

fetch("scripts/datas.json") 
// (ligne qui pointe vers le service externe à qui on veut s’adresser)

// (méthode then ^pour gérer la réponse reçue en retour)
  .then(response => response.json()) 
//   ( 1) convertir en json : tableaux objets et clés et envoyer les données au .then suivant)
  .then(data => { 
    // (2) à partir des datas qu’on a converti, faire un console log poour voir ce qu’on a) récup
    console.log(data); 
    // (3) toutes la programmations se fait ici, qu’est ce que je vais en faire)

    // ajouter les matchs de json vers html
    for(let i=0; i<data.matchs.length; i++){
      lines_matchs.innerHTML += `<div class="line_match" data-index=${data.matchs[i].match_id}>
      <div class="match">
          <span class="teamDom">${data.matchs[i].hometeam}</span>-<span class="teamGuest">${data.matchs[i].awayteam}</span>
      </div>
      <div class="buttons_quotes">
          <button class="button domicile" type="submit">${data.matchs[i].home_odd}</button>
          <button class=" button nul" type="submit">${data.matchs[i].draw_odd}</button>
          <button class="button invite" type="submit">${data.matchs[i].away_odd}</button>
      </div>
      </div>`
    }
    // addTabLine (hometeam, awayteam, home_odd, draw_odd, away_odd)

  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error); 
//   (4) si on a pas les droits ou on a fait une erreur, ça les retourne ici)
})

}

// appels des functions en dehors des events ******
// appel fonction fetch 
myFetch()

// events *************************************

// délégation d'évènement buttons & classe active 
lines_matchs.addEventListener("click", function(e){
// vérifier si l'élément sur lequel on click c'est bien celui qui nous intéresse
if(e.target.classList.contains('button')){

  // choices.innerHTML += `<div class="choice">
  // //   <ul class="choice_line">
  // //       <li class="teamChoice">${data.matchs[i].hometeam}</li>
  // //       <li class="quoteChoice">${data.matchs[i].home_odd}</li>
  // //       <span class="delete">❌</span>
  // //   </ul>
  // //   <p class="teams">${data.matchs[i].hometeam}</span>-<span class="teamGuest">${data.matchs[i].awayteam}</p>
  // // </div>`




  // on vérifie si l'élément clické a la classe active, on le retire
if(e.target.classList.contains('active')){
  // si la réponse est true :
  // toggle enlève si elle est là, met si elle n'est pas là
  e.target.classList.toggle('active')
  // si l'élément clické n'a pas la classe active, on l'ajoute'
} else {
  
//  maintenant, on doit vérifier si un autre enfant a la classe Active, on doit le retirer
  // Si le parent (lines_matchs) a un autre enfant (qque celui sur lequel je click) qui a la classe active ... 
  if(lines_matchs.querySelector('.active')){
    lines_matchs.querySelector('.active').classList.remove('active')
      e.target.classList.add('active')
    
  // Si le parent (lines_matchs) n'a pas la classe active sur un des enfants on l'ajoutte sur le bttn clické
  } else {
      e.target.classList.toggle('active')
  }
}
}
})
