// Sélectionner le formulaire
const paymentForm = document.getElementById("payment-form");
const notificationsDiv = document.getElementById("notifications");



const matriculeInput = document.getElementById("matricule");

matriculeInput.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});


// Ajouter un écouteur d'événement pour le bouton "Payer"
paymentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les données du formulaire
    const matricule = document.getElementById("matricule").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const classe = document.getElementById("classe").value;
    const montant = document.getElementById("montant").value.trim();


    const matriculeRegex = /^[0-9]{2}[A-Z]{2}[0-9]{3}$/;

    if (!matriculeRegex.test(matricule)) {
        alert(
            `Le matricule doit être au format "25AA001" : 
            - Les 2 premiers chiffres pour l'année (ex. 25 pour 2025),
            - Les 2 lettres suivantes pour les initiales du nom et du post-nom (ex. AA pour Assani Assani),
            - 3 chiffres pour le numéro séquentiel.`
        );
        return;
    }

    // Validation de base
    if (!matricule || !nom || !classe || !montant) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const paiement = {
        matricule,
        nom,
        classe,
        montant: parseInt(montant),
        date: new Date().toLocaleDateString(),
    };

    addPaymentToLocalStorage(paiement);

    // Afficher une notification de succès
    // showNotification(
    //     `Paiement réussi ! ${nom} (${classe}) a payé ${montant} Fc.`
    // );

    addNotification(
        `Paiement de ${montant} Fc effectué par ${nom} (${classe}) le ${paiement.date}.`
    );

    generateReceipt(paiement)

    // Ajouter les détails dans la console (ou plus tard dans une base de données)
    console.log("Détails du paiement :", paiement);

    // Réinitialiser le formulaire après soumission
    paymentForm.reset();
});

// Fonction pour afficher une notification
// function showNotification(message) {
//     // Créer un élément de notification
//     const notification = document.createElement("div");
//     notification.classList.add("notification");
//     notification.textContent = message;

//     // Ajouter la notification au corps du document
//     document.body.appendChild(notification);

//     // Supprimer la notification après 5 secondes
//     setTimeout(() => {
//         notification.remove();
//     }, 5000);
// }


function addNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    notificationsDiv.appendChild(notification);

    // Supprimer la notification après 10 secondes
    setTimeout(() => {
        notification.remove();
    }, 10000);
}

// Ajouter un paiement dans le stockage local
function addPaymentToLocalStorage(payment) {
    const payments = JSON.parse(localStorage.getItem("payments")) || [];
    payments.push(payment);
    localStorage.setItem("payments", JSON.stringify(payments));
}

addPaymentToHistory({
    matricule: matricule,
    nom: nom,
    classe: classe,
    montant: montant,
    date: new Date().toLocaleDateString(),
});

function addPaymentToHistory(payment) {
    payments.push(payment);
    alert("Paiement ajouté à l'historique !");
}



// Fonction pour générer un reçu
function generateReceipt(payment) {
    // Supprimer tout reçu existant
    const existingReceipt = document.getElementById("receipt");
    if (existingReceipt) {
        existingReceipt.remove();
    }

    // Créer le HTML pour le reçu
    const receiptContent = `
        <div id="receipt" class="receipt">
            <h2>Reçu de Paiement</h2>
            <p><strong>Matricule :</strong> ${payment.matricule}</p>
            <p><strong>Nom Complet :</strong> ${payment.nom}</p>
            <p><strong>Classe :</strong> ${payment.classe}</p>
            <p><strong>Montant :</strong> ${payment.montant} Fc</p>
            <p><strong>Date :</strong> ${payment.date}</p>
            <button onclick="printReceipt()">Imprimer le Reçu</button>
            <button onclick="closeReceipt()">Fermer</button>
        </div>
    `;

    // Ajouter le reçu au document
    document.body.insertAdjacentHTML("beforeend", receiptContent);
}

// Fonction pour imprimer le reçu
function printReceipt() {
    const receipt = document.getElementById("receipt");
    if (!receipt) {
        alert("Aucun reçu à imprimer.");
        return;
    }

    const originalContent = document.body.innerHTML;

    // Afficher uniquement le reçu pour l'impression
    document.body.innerHTML = receipt.outerHTML;
    window.print();

    // Restaurer le contenu initial de la page
    document.body.innerHTML = originalContent;
    window.location.reload(); // Recharger la page pour réinitialiser
}

// Fonction pour fermer le reçu
function closeReceipt() {
    const receipt = document.getElementById("receipt");
    if (receipt) receipt.remove();
}