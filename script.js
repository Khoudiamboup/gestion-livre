document.addEventListener("DOMContentLoaded", function () {

    let alire = document.getElementById("alire");
    let lu = document.getElementById("lu");
    let buttonaddLivre = document.querySelector(".addLivreButton");
    let modal = document.getElementById("livremodal");
    let modalButton = document.getElementById("addLivreModalButton");
    let close = document.querySelector(".close");

    let idCounter = 0;

    buttonaddLivre.addEventListener("click", function (event) {
        event.preventDefault();

        let titre = document.getElementById("titre").value;
        let auteur = document.getElementById("auteur").value;

        if (titre === "" || auteur === "") {
            alert("Les deux champs doivent être remplis");
            return;
        } else {

            document.getElementById("titre1").style.visibility = "visible";
            document.getElementById("titre2").style.visibility = "visible";

            document.getElementById("pretexte").style.visibility = "hidden";

        }
        let livre = {
            id: idCounter++,
            titre: titre,
            auteur: auteur,
            lu: false
        };

        saveBookToLocalStorage(livre);

        displayBook(livre, alire);

        modal.style.display = "none";

        document.getElementById("titre").value = "";
        document.getElementById("auteur").value = "";
    });
    modalButton.onclick = function () {
        modal.style.display = "block";
    };

    close.onclick = function () {
        modal.style.display = "none";
    };

    function saveBookToLocalStorage(book) {
        let livres = JSON.parse(localStorage.getItem('livres')) || [];
        livres.push(book);
        localStorage.setItem('livres', JSON.stringify(livres));
    }

    function displayBook(book, list) {
        let listItem = document.createElement('li');
        listItem.id = "livre-" + book.id;
        listItem.innerHTML = `${book.titre} - ${book.auteur} <i id="${book.id}" class="fa ${book.lu ? 'fa-check' : 'fa-circle-o'}" onClick="toggleReadStatus(this.id)" aria-hidden="true"></i> <i id="${book.id}" onClick="supprimer(this.id)" class="fa fa-trash-o" aria-hidden="true"></i>`;
        list.appendChild(listItem);
    }
    window.toggleReadStatus = function (id) {
        let livres = JSON.parse(localStorage.getItem('livres')) || [];
        let index = livres.findIndex(livre => livre.id == id);
        livres[index].lu = !livres[index].lu;
        localStorage.setItem('livres', JSON.stringify(livres));
        refreshBooks();

    }
    window.supprimer = function (id) {
        let livres = JSON.parse(localStorage.getItem('livres')) || [];
        let index = livres.findIndex(livre => livre.id == id);
        if (index !== -1) {
            livres.splice(index, 1);
            localStorage.setItem('livres', JSON.stringify(livres));
            refreshBooks();
        } else {
            console.error("Livre non trouvé dans le localStorage.");
        }
    }
    function refreshBooks() {
        alire.innerHTML = "";
        lu.innerHTML = "";
        loadBooks();
    }

    function loadBooks() {
        let livres = JSON.parse(localStorage.getItem('livres')) || [];
        livres.forEach(function (livre) {
            displayBook(livre, livre.lu ? lu : alire);
        });
    }

    loadBooks();
});
