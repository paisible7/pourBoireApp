// Exemple de données de paiement (simulées)
// const payments = [
//     {
//         matricule: "2023001",
//         nom: "Jean Dupont",
//         classe: "3ème",
//         montant: 15000,
//         date: "2025-01-15",
//     },
//     {
//         matricule: "2023002",
//         nom: "Marie Curie",
//         classe: "4ème",
//         montant: 20000,
//         date: "2025-01-16",
//     },
//     {
//         matricule: "2023003",
//         nom: "Albert Einstein",
//         classe: "5ème",
//         montant: 10000,
//         date: "2025-01-17",
//     },
// ];

// Charger les paiements depuis le stockage local
function loadPaymentsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("payments")) || [];
}

// Fonction pour afficher l'historique des paiements
function displayPaymentHistory() {
    const payments = loadPaymentsFromLocalStorage();
    const tableBody = document.getElementById("payment-history");

    // Vider le contenu existant
    tableBody.innerHTML = "";

    if (payments.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5" style="text-align: center;">Aucun paiement enregistré.</td>`;
        tableBody.appendChild(row);
        return;
    }

    // Ajouter chaque paiement comme une ligne dans le tableau
    payments.forEach((payment) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${payment.matricule}</td>
        <td>${payment.nom}</td>
        <td>${payment.classe}</td>
        <td>${payment.montant} Fc</td>
        <td>${payment.date}</td>
      `;

        tableBody.appendChild(row);
    });
}

// Afficher l'historique des paiements lorsque la page se charge
document.addEventListener("DOMContentLoaded", displayPaymentHistory);
