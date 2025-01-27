// Simuler le matricule de l'élève à afficher (cela sera passé dynamiquement plus tard, par ex. via URL)
const matriculeActuel = "22KM127"; // Exemple : Matricule à afficher

// Récupérer les données des élèves depuis le localStorage
const eleves = JSON.parse(localStorage.getItem("eleves")) || [];

// Trouver l'élève correspondant au matricule
const eleve = eleves.find((e) => e.matricule === matriculeActuel);


// Si l'élève est trouvé, afficher ses informations
if (eleve) {
    document.getElementById("profile-name").textContent = `Nom : ${eleve.nom}`;
    document.getElementById("profile-matricule").textContent = eleve.matricule;
    document.getElementById("profile-class").textContent = eleve.classe;
    document.getElementById("profile-balance").textContent = eleve.montantRestant;

    // Afficher l'historique des paiements
    const paymentHistory = document.getElementById("payment-history");
    eleve.historiquePaiements.forEach((paiement) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${paiement.mois} : ${paiement.montant} Fc payé le ${paiement.date}`;
        paymentHistory.appendChild(listItem);
    });
} else {
    alert("Aucun élève trouvé avec ce matricule !");
}
