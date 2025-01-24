// Sélectionner le formulaire
const paymentForm = document.getElementById("payment-form");
const notificationsDiv = document.getElementById("notifications");
// Ajouter un écouteur d'événement pour le bouton "Payer"
paymentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les données du formulaire
    const matricule = document.getElementById("matricule").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const classe = document.getElementById("classe").value;
    const montant = document.getElementById("montant").value.trim();

    // Validation de base
    if (!matricule || !nom || !classe || !montant) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Simuler un paiement
    const paiement = {
        matricule: matricule,
        nom: nom,
        classe: classe,
        montant: montant,
        date: new Date().toLocaleDateString(),
    };

    // Afficher une notification de succès
    showNotification(
        `Paiement réussi ! ${nom} (${classe}) a payé ${montant} FCFA.`
    );

    addNotification(
        `Paiement de ${montant} FCFA effectué par ${nom} (${classe}) le ${paiement.date}.`
    );

    // Ajouter les détails dans la console (ou plus tard dans une base de données)
    console.log("Détails du paiement :", paiementDetails);

    // Réinitialiser le formulaire après soumission
    paymentForm.reset();
});

// Fonction pour afficher une notification
function showNotification(message) {
    // Créer un élément de notification
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    // Ajouter la notification au corps du document
    document.body.appendChild(notification);

    // Supprimer la notification après 5 secondes
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function addPaymentToHistory(payment) {
    payments.push(payment);
    alert("Paiement ajouté à l'historique !");
}

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
