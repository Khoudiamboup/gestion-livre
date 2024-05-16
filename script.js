// Attend que le document HTML soit complètement chargé et analysé
document.addEventListener("DOMContentLoaded", function() {
    // Récupère les éléments DOM nécessaires
 let alire = document.getElementById("alire");
 let lu = document.getElementById("lu");
 let buttonaddLivre = document.querySelector(".addLivreButton"); 
 let modal = document.getElementById("livremodal");
 let modalButton = document.getElementById("addLivreModalButton");
 let close = document.querySelector(".close");
 let idCounter = 0; // Initialise un compteur pour les ID des livres

    // Ajoute un gestionnaire d'événement au clic sur le bouton d'ajout de livre
    buttonaddLivre.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        // Récupère les valeurs des champs de texte
        let titre = document.getElementById("titre").value;
        let auteur = document.getElementById("auteur").value;

        // Vérifie si les champs sont vides
        if (titre === "" || auteur === "") {
            alert("Les deux champs doivent être remplis");
            return;
        }else {
            //Ne pas voir titre h2 quqnd on ouvre l application
            document.getElementById("titre1").style.visibility = "visible";
            document.getElementById("titre2").style.visibility = "visible";
            //Plus voir le texte apres avoir un livre
            document.getElementById("pretexte").style.visibility = "hidden";
            
        }

        // Crée un objet représentant le livre avec un ID unique et une propriété indiquant s'il est lu ou non
        let livre = {
            id: idCounter++, // Incrémente le compteur d'ID pour chaque nouveau livre ajouté
            titre: titre,
            auteur: auteur,
            lu: false // Initialise la propriété "lu" à false pour indiquer que le livre n'est pas lu
        };

        // Enregistre le livre dans le localStorage
        saveBookToLocalStorage(livre);

        // Affiche le livre dans la liste des livres à lire
        displayBook(livre, alire);

        // Cache le modal après avoir ajouté le livre
        modal.style.display = "none";

        // Réinitialise les champs du formulaire
        document.getElementById("titre").value = "";
        document.getElementById("auteur").value = "";
    });

    // Ajoute un gestionnaire d'événement pour afficher le modal au clic sur le bouton "Ajouter un livre"
    modalButton.onclick = function () {
        modal.style.display = "block";
    };

    // Ajoute un gestionnaire d'événement pour cacher le modal au clic sur le bouton de fermeture
    close.onclick = function () {
        modal.style.display = "none";
    };

    // Fonction pour enregistrer le livre dans le localStorage
    function saveBookToLocalStorage(book) {
        let livres = JSON.parse(localStorage.getItem('livres')) || [];
        livres.push(book);
        localStorage.setItem('livres', JSON.stringify(livres));
    }

    // Fonction pour afficher un livre dans la liste spécifiée
    function displayBook(book, list) {
        let listItem = document.createElement('li');
        listItem.id = "livre-" + book.id;
        listItem.innerHTML = `${book.titre} - ${book.auteur} <i id="${book.id}" class="fa ${book.lu ? 'fa-check' : 'fa-circle-o'}" onClick="toggleReadStatus(this.id)" aria-hidden="true"></i> <i id="${book.id}" onClick="supprimer(this.id)" class="fa fa-trash-o" aria-hidden="true"></i>`;
        list.appendChild(listItem);
    }

    // Fonction pour changer le statut de lecture d'un livre (lu ou non lu)
    window.toggleReadStatus = function(id) {
        let livres = JSON.parse(localStorage.getItem('livres')) || [];
        let index = livres.findIndex(livre => livre.id == id);
        livres[index].lu = !livres[index].lu; // Inverse le statut de lecture du livre
        localStorage.setItem('livres', JSON.stringify(livres)); // Met à jour le localStorage avec le nouveau statut
        refreshBooks(); // Rafraîchit l'affichage des livres pour refléter les changements
        
    }

    // Fonction pour supprimer un livre
    window.supprimer = function(id) {
        let livres = JSON.parse(localStorage.getItem('livres')) || [];
        let index = livres.findIndex(livre => livre.id == id);
        if (index !== -1) {
            livres.splice(index, 1); // Supprime le livre du tableau des livres
            localStorage.setItem('livres', JSON.stringify(livres)); // Met à jour le localStorage sans le livre supprimé
            refreshBooks(); // Rafraîchit l'affichage des livres pour refléter les changements
        } else {
            console.error("Livre non trouvé dans le localStorage.");
        }
    }

    // Fonction pour rafraîchir l'affichage des livres
    function refreshBooks() {
        alire.innerHTML = ""; // Efface la liste des livres à lire
        lu.innerHTML = ""; // Efface la liste des livres lus
        loadBooks(); // Recharge et réaffiche les livres à partir du localStorage
    }

    // Fonction pour charger et afficher les livres au chargement de la page
    function loadBooks() {
        let livres = JSON.parse(localStorage.getItem('livres')) || []; // Récupère les livres depuis le localStorage
        livres.forEach(function(livre) {
            displayBook(livre, livre.lu ? lu : alire); // Affiche chaque livre dans la liste correspondante (à lire ou lus)
        });
    }

    loadBooks(); // Appelle la fonction pour charger et afficher les livres au démarrage de l'application
});
