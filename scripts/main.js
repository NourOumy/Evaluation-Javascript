// variables *************************************
let randomImg = document.querySelector('.randomImg')
let header = document.querySelector('header')
let marge = document.querySelector('.marge')
let darkModeBtn = document.querySelector('.darkModeBtn')
let lightModeBtn = document.querySelector('.lightModeBtn')
let langButtons = document.querySelectorAll('.langBtn')
let yourBets = document.querySelector('.yourBets')
let lines_matchs = document.querySelector('.lines_matchs')
let teamDom = document.querySelector('.teamDom')
let teamGuest = document.querySelector('.teamGuest')
let buttons_quotes = document.querySelector('.buttons_quotes')
let choices = document.querySelector('.choices')
let toHide = document.querySelector('.toHide')
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

// Vérifiez s'il existe une préférence utilisateur précédemment enregistrée pour le mode sombre dans le stockage local
if (localStorage.getItem('darkMode') === 'true') {
  darkMode();
}

// functions *************************************

// Fonction pour définir un cookie
function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Fonction pour obtenir la valeur d'un cookie
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}
// Fonction pour définir la langue sélectionnée dans un cookie
function setLanguageCookie(language) {
  // Demander le consentement de l'utilisateur pour enregistrer la langue dans un cookie
  const consent = confirm("Voulez-vous enregistrer votre langue préférée ?");
  if (consent) {
    setCookie("language", language, 30); // Enregistrer la langue sélectionnée dans un cookie qui expire dans 30 jours
  }
}

// Fonction pour obtenir la langue sélectionnée à partir du cookie
function getLanguageCookie() {
  return getCookie("language"); // Obtenir la langue sélectionnée à partir du cookie
}

// Fonction pour obtenir la valeur d'un cookie
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}

// Fonction pour afficher le contenu en anglais
function displayContentEnglish() {
  // Modifier le contenu de votre site pour afficher en anglais
}

// Fonction pour afficher le contenu en français
function displayContentFrench() {
  // Modifier le contenu de votre site pour afficher en français
}

// Fonction pour afficher le contenu en espagnol
function displayContentSpanish() {
  // Modifier le contenu de votre site pour afficher en espagnol
}

// Fonction pour activer le mode sombre
function darkMode(){
      marge.classList.add('dark-mode')
      header.classList.add('dark-mode')
      // local storage pour enregistrer le choix de l'utilisateur
      localStorage.setItem('darkMode', 'true')
  
}

// Fonction pour désactiver le mode sombre
function desactiverDarkMode() {
  marge.classList.remove('dark-mode')
  header.classList.remove('dark-mode')
  // Enregistrez le choix de l'utilisateur dans le stockage local
  localStorage.setItem('darkMode', 'false')
}

function hidePopup() {
  // Vérifie si l'élément .choice existe et que le compteur de bets est égal à 0
  if (parseInt(compteurBets.textContent) === 0) {
    // Si les conditions sont remplies, masquer l'élément .choice
    toHide.style.display = 'none';
  }else{
    toHide.style.display = 'block';

  }
}

// injecter les éléments dans le pop up 
function addToPopUp (destination, teamChoice, quoteChoice, teamDom, teamGuest, index ){
  // je vérifie si un élément existe déjà avec ce data index 
  const dataIndexExiste = destination.querySelector(`[data-index="${index}"]`);
  // s'il existe, remplacer par le nouveau 
  if(dataIndexExiste){
    dataIndexExiste.innerHTML = `
    <div class="choice" data-index=${index}>
        <ul class="choice_line">
              <li class="teamChoice">${teamChoice}</li>
              <li class="quoteChoice">${quoteChoice}</li>
              <span class="delete">❌</span>
        </ul>
        <p class="teams">${teamDom}</span>-<span class="teamGuest">${teamGuest}</p>
    </div>`
    // Mise à jour de la cote existante
    dataIndexExiste.querySelector('.quoteChoice').textContent = quoteChoice;
    // Retirer l'ancienne cote du tableau cotesTab
    const oldIndex = cotesTab.indexOf(dataIndexExiste.querySelector('.quoteChoice').textContent);
    if (oldIndex !== -1) {
      cotesTab.splice(oldIndex, 1);
    }
  }else{ //sinon, j'ajoute le new
    destination.innerHTML += `
      <div class="choice" data-index=${index}>
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
  }
  
      // Vérifier si la cote existe déjà dans le tableau cotesTab avant de l'ajouter
      const existingIndex = cotesTab.findIndex(function(item) {
        return item.index === index;
      });

      // Si l'index existe déjà dans le tableau cotesTab
      if (existingIndex !== -1) {
        // Mettre à jour la cote existante avec la nouvelle cote
        cotesTab[existingIndex] = { index: index, quoteChoice: quoteChoice };
      } else {
        // Si l'index n'existe pas encore dans le tableau cotesTab,
        // ajouter une nouvelle entrée avec l'index et la nouvelle cote
        cotesTab.push({ index: index, quoteChoice: quoteChoice });
      }

      console.log(cotesTab)
      // fonction pour faire apparaitre le popup qd j'incrémente 
      hidePopup()

}

function updateGainPotentiel() {
  // Récupérer la valeur de l'input mise
  let valeurMise = parseFloat(inputMise.value);
  /// vérifier si la valeur extraite de inputMise.value est un nombre valide ou non et =0
  if (isNaN(valeurMise) || valeurMise === 0) {
    // Si l'input est vide ou égal à zéro, afficher 0 dans gainPotentiel_result
    gainPotentiel_result.innerHTML = "0";
  } else {
    // Calculer le gain potentiel en multipliant la mise par les cotes
    multGainPotentiel = valeurMise * sommecotes;
    // Mettre à jour le contenu HTML pour afficher le gain potentiel
    gainPotentiel_result.innerHTML = multGainPotentiel.toFixed(1);
  }
  console.log(multGainPotentiel);
}

// multiplier les cotes entre elles puis appeler la fonction à la fin dans la délégation d'event button & classe active 
function multiplyCotes() {
  // je réinitialise la variable qui stocke les chiffres 
  sommecotes = 1
  // multiplier les quotes entre elles 
      // parcourir le tab pour les multiplier entre eux 
      for(let i = 0; i< cotesTab.length; i++){

        // multiplier la variable qui stocke par la quoteChoice stockée dans le tableau 
        sommecotes*= parseFloat(cotesTab[i].quoteChoice)
      }
      console.log(sommecotes);
      // j'injecte dans l'html 
      coteTotal_result.innerHTML = sommecotes.toFixed(1)
      updateGainPotentiel()
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
              
              if(e.target.classList.contains('active')){
              // si la réponse est true :
              // Supprimer l'élément avec le même data-index du conteneur "choices" (popup)
              const dataIndex = e.target.closest('.line_match').dataset.index;
              const choiceToDelete = document.querySelector(`.choice[data-index="${dataIndex}"]`);
              if (choiceToDelete) {
                  choiceToDelete.remove()
              }
            // toggle enlève si elle est là, met si elle n'est pas là
              e.target.classList.toggle('active') 
              // si l'élément clické n'a pas la classe active, on l'ajoute'
              } else {
              //  maintenant, on doit vérifier si un autre enfant a la classe Active, on doit le retirer
              // Si le parent (lines_matchs) a un autre enfant (qque celui sur lequel je click) qui a la classe active ... 
              if(lineMatch.querySelector('.active')){
                lineMatch.querySelector('.active').classList.remove('active')
                  e.target.classList.add('active')
                
              // Si le parent (lines_matchs) n'a pas la classe active sur un des enfants on l'ajoutte sur le bttn clické
              } else {
              e.target.classList.toggle('active')
                      
              // variables pour le contenu de chaque cible avec data-index qui suit dans le pop up
              let teamGuest_content = e.target.parentElement.parentElement.querySelector('.teamGuest').textContent
              let teamDom_content = e.target.parentElement.parentElement.querySelector('.teamDom').textContent
              let button_content = e.target.textContent
              let dataIndex = e.target.closest('.line_match').dataset.index
              // condition pour chaque bouton sélectionné + nourrir dans le popup
              if(e.target.classList.contains('domicile')){
                // fonction créée plus haut avec les arguments nécessaires 
                addToPopUp(choices, teamDom_content, button_content, teamDom_content,teamGuest_content, dataIndex)
              }else if(e.target.classList.contains('nul')){
                addToPopUp(choices, 'Match Nul', button_content, teamDom_content,teamGuest_content, dataIndex)
              }else{ //e.target.classList.contains('invite')
                addToPopUp(choices, teamGuest_content, button_content, teamDom_content,teamGuest_content, dataIndex)
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

// appel de la fonction pour cacher le popup car au chargement de la page je n'ai rien incrémenté
hidePopup()


// events *************************************

// input et multiplication gain potentiel 
// dès qu'on met qlqch dans l'input on actionne la multiplication pour avoir le gain potentiel:
inputMise.addEventListener("input", function() {
  updateGainPotentiel()
})

// supprimer un élément de la liste 
//  délégation d'événements pour supprimer au  click de 'delete'
choices.addEventListener("click", function(event) {
  // je vérifie si c'est le bon élément
  if (event.target.classList.contains('delete')) {
    console.log('hello'); 
    // Récupère l'index de l'élément à supprimer
    const dataIndex = event.target.closest('.choice').dataset.index;
    
    // Récupère la cote associée à l'élément supprimé
    const deletedQuote = parseFloat(event.target.parentElement.querySelector('.quoteChoice').textContent);

    // Supprime l'élément parent du bouton de suppression (div.choice)
    const deletedElement = event.target.closest('.choice');
    deletedElement.remove();

    // Retire la cote associée du résultat total des cotations
    if (deletedQuote) {
      sommecotes /= deletedQuote;
      coteTotal_result.innerHTML = sommecotes.toFixed(1);
    }
    
    // Retirer l'élément correspondant de cotesTab

    // Je parcours chaque élément du tableau cotesTab
    for (let i = 0; i < cotesTab.length; i++) {
      // Si je trouve un élément dont l'index correspond à celui de l'élémentt supprimé, je le retire du tableau avec splice
      if (cotesTab[i].index === dataIndex) {
        cotesTab.splice(i, 1);
        // dès que j'ai trouvé, je m'arrête, il n'est plus nécessaire de parcourrir le ttab 
        break;
      }
    }

    // Retirer la classe active associée au data-index de l'élément supprimé
    // création de la variable pour rechercher la classe du btn avec le dataIndex 
    const lineMatch = document.querySelector(`.line_match[data-index="${dataIndex}"]`);
    if (lineMatch) { // s'il y en a une 
      // créée la variable qui va récup linematch avec classe active 
    const activeElement = lineMatch.querySelector('.active');
    // s'il y en a une, je remove la classe active 
    if (activeElement !== null) {
      activeElement.classList.remove('active');
    }
}





    // Recalculer les cotations après la suppression d'un élément
    multiplyCotes();
    // remettre compteur de bets à jour, le décrémenter (je sais pas si ça se dit :-))
    sommeBest--;
    // injecter dans l'html 
    compteurBets.innerHTML = sommeBest;
  }
  // fonction pour cacher le pop up si j'ai ttout supprimé 
  hidePopup()
})

document.addEventListener("DOMContentLoaded", function() {
  // Tableau pour les chemins vers les images de fond
  let backgroundImages = [
      "bg1.webp",
      "bg2.webp",
      "bg3.webp"
  ]

  // random
  let randomIndex = Math.floor(Math.random() * backgroundImages.length);
  let bgimg = backgroundImages[randomIndex];

  // Appliquer l'image de fond au corps du document
  randomImg.style.background = `url(../images/${bgimg}) center/contain no-repeat`;
})

// event pour détecter les clics sur le bouton "Dark Mode"
darkModeBtn.addEventListener('click', function() {
  darkMode()
  lightModeBtn.style.display = 'block'
  darkModeBtn.style.display = 'none'
  
})

// event pour détecter les clics sur le bouton "lightt Mode"
lightModeBtn.addEventListener('click', function() {
  // Si le mode sombre est activé, on le désactive
  desactiverDarkMode();
  darkModeBtn.style.display = 'block'
  lightModeBtn.style.display = 'none'
  
})

// Ajouter des gestionnaires d'événements pour les boutons de langue
langButtons.forEach(langButton => {
  langButton.addEventListener('click', function() {
      // Vérifier quelle langue a été sélectionnée et appeler la fonction correspondante
      const selectedLang = langButton.dataset.lang;
      if (selectedLang === 'english') {
          displayContentEnglish();
          setLanguageCookie('english'); // Enregistrer la langue sélectionnée dans un cookie
      } else if (selectedLang === 'french') {
          displayContentFrench();
          setLanguageCookie('french'); // Enregistrer la langue sélectionnée dans un cookie
      } else if (selectedLang === 'spanish') {
          displayContentSpanish();
          setLanguageCookie('spanish'); // Enregistrer la langue sélectionnée dans un cookie
      }
      console.log(getCookie("language"));
  });
});

// Au chargement de la page, vérifier s'il existe un cookie de langue et afficher le contenu correspondant
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = getLanguageCookie();
  if (savedLang === 'english') {
      displayContentEnglish();
  } else if (savedLang === 'french') {
      displayContentFrench();
  } else if (savedLang === 'spanish') {
      displayContentSpanish();
  }
});
