// variables *************************************
let lines_matchs = document.querySelector('.lines_matchs')
let teamDom = document.querySelector('.teamDom')
let teamGuest = document.querySelector('.teamGuest')
let buttons_quotes = document.querySelector('.buttons_quotes')
let choices = document.querySelector('.choices')
let domicileBtn = document.querySelector('.domicile')
let cotesTab =[]
let compteurBets = document.querySelector('.compteurBets')
let sommeBest = 0
let coteTotal_result = document.querySelector('.coteTotal_result')
let sommecotes = 1
let gainPotentiel_result = document.querySelector('.gainPotentiel_result')
let multGainPotentiel = 1
let inputMise = document.querySelector('.miseNbr')
let valeurMise = inputMise.value 


// functions *************************************


// injecter les éléments dans le pop up 
function addToPopUp (destination, teamChoice, quoteChoice, teamDom, teamGuest ){
  // injecter les éléments dans l'httml 
  destination.innerHTML += `
      <div class="choice">
          <ul class="choice_line">
                <li class="teamChoice">${teamChoice}</li>
                <li class="quoteChoice">${quoteChoice}</li>
                <span class="delete">❌</span>
          </ul>
          <p class="teams">${teamDom}</span>-<span class="teamGuest">${teamGuest}</p>
      </div>`

      // incrémenter le compteur et l'injecter dans l'hhtml 
      sommeBest++
      compteurBets.innerHTML = sommeBest

      // push chaque cote 
      cotesTab.push(quoteChoice)
      console.log(cotesTab)
}

// multiplier les cotes entre elles puis appeler la fonction à la fin dans la délégation d'event button & classe active 
function multiplyCotes() {
  // je réinitialise la variable qui stocke les chiffres 
  sommecotes = 1
  // multiplier les quotes entre elles 
      // parcourir le tab pour les multiplier entre eux 
      for(let i = 0; i< cotesTab.length; i++){
        sommecotes*= parseFloat(cotesTab[i])
      }
      // j'injecte dans l'html 
      coteTotal_result.innerHTML = sommecotes.toFixed(1)
}




// intégrer API début ********************
function myFetch (){

fetch("scripts/datas.json") 
// (ligne qui pointe vers le service externe à qui on veut s’adresser)

// (méthode then ^pour gérer la réponse reçue en retour)
  .then(response => response.json()) 
//   ( 1) convertir en json : tableaux objets et clés et envoyer les données au .then suivant)
  .then(data => { 
    // (2) à partir des datas qu’on a converti, faire un console log poour voir ce qu’on a récup
    console.log(data); 
    // (3) toutes la programmation

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

  // event buttons & classe active  début*************************************
    // constante pour faire mon forEach 
  const lineMatches = document.querySelectorAll('.line_match');

    // délégation d'évènement buttons & classe active 

  lineMatches.forEach(lineMatch => {

      lineMatch.addEventListener("click", function(e){
          // vérifier si l'élément sur lequel on click c'est bien celui qui nous intéresse
          if(e.target.classList.contains('button')){
         
                // on vérifie si l'élément clické a la classe active, on le retire
              if(e.target.classList.contains('active')){
                // si la réponse est true :
                // toggle enlève si elle est là, met si elle n'est pas là
                e.target.classList.toggle('active')        
                // si l'élément clické n'a pas la classe active, on l'ajoute'
              } else {
                
              //  maintenant, on doit vérifier si un autre enfant a la classe Active, on doit le retirer
                // Si le parent (line_match) a un autre enfant (qque celui sur lequel je click) qui a la classe active ... 
                if(lineMatch.querySelector('.active')){
                  lineMatch.querySelector('.active').classList.remove('active')
                    e.target.classList.add('active')
                  
                // Si le parent (line_match) n'a pas la classe active sur un des enfants on l'ajoutte sur le bttn clické
                } else {
                    e.target.classList.toggle('active')


                  // condition pour chaque bouton sélectionné + nourrir dans le popup
                    // variables pour le contenu de chaque cible 
                    let teamGuest_content = e.target.parentElement.parentElement.querySelector('.teamGuest').textContent
                    let teamDom_content = e.target.parentElement.parentElement.querySelector('.teamDom').textContent
                    let button_content = e.target.textContent
                      
                      if(e.target.classList.contains('domicile')){
                        // fonction créée plus haut avec les arguments nécessaires 
                        addToPopUp(choices, teamDom_content, button_content, teamDom_content,teamGuest_content)
                      }else if(e.target.classList.contains('nul')){
                        addToPopUp(choices, 'Match Nul', button_content, teamDom_content,teamGuest_content)
                      }else{ //e.target.classList.contains('invite')
                        addToPopUp(choices, teamGuest_content, button_content, teamDom_content,teamGuest_content)
                      }

                      // une fois toutes les cotes ajoutées je fais la multiplications pour éviter les doublons etc 
                      multiplyCotes()
                     
                     
                      
                }
              }
          }
      })

    })
    // event buttons & classe active fin *************************************



  
  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error); 
//   (4) si on a pas les droits ou on a fait une erreur, ça les retourne ici)
})

}

// intégrer API fin ********************

// appels des functions en dehors des events ******
// appel fonction fetch 
myFetch()

// events *************************************

// dès qu'on met qlqch dans l'input 
inputMise.addEventListener("input", function() {
  // initialise la variable dans l'event 
  let valeurMise = inputMise.value;
  // j'injecte le resultat dans la variable créée au tout début 
  multGainPotentiel = valeurMise*sommecotes
  // j'injecte l'html 
  gainPotentiel_result.innerHTML = multGainPotentiel
 
})

