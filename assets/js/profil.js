const searchForm = document.getElementById("search-form");
const profileSection = document.getElementById("profile-section");
const profileInfo = document.getElementById("profile-info");

// Ajouter un écouteur pour rechercher l'élève
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Récupérer le matricule entré
    const matricule = document.getElementById("search-matricule").value.trim().toUpperCase();

    // Récupérer les paiements stockés dans le localStorage
    const payments = JSON.parse(localStorage.getItem("payments")) || [];

    // Trouver les paiements correspondant au matricule
    const eleve = payments.find((p) => p.matricule === matricule);

    if (!eleve) {
        alert("Aucun élève trouvé avec ce matricule !");
        profileSection.classList.add("hidden");
        return;
    }

    // Afficher les informations dans la section profil
    profileInfo.innerHTML = `
        <p><strong>Matricule :</strong> ${eleve.matricule}</p>
        <p><strong>Nom :</strong> ${eleve.nom}</p>
        <p><strong>Classe :</strong> ${eleve.classe}</p>
        <p><strong>Dernier Montant Payé :</strong> ${eleve.montant} FCFA</p>
        <p><strong>Date du Dernier Paiement :</strong> ${eleve.date}</p>
    `;

    // Afficher la section profil
    profileSection.classList.remove("hidden");
});


const eleves = [
    {
        matricule: "25JD001",
        nom: "John Doe",
        classe: "3ème",
        historiquePaiements: [
            { mois: "Janvier", montant: 15000, date: "2025-01-10" },
            { mois: "Février", montant: 15000, date: "2025-01-25" },
        ],
        montantRestant: 30000,
    },
    {
        matricule: "25AM002",
        nom: "Alice Martin",
        classe: "Terminale",
        historiquePaiements: [
            { mois: "Janvier", montant: 20000, date: "2025-01-12" },
        ],
        montantRestant: 40000,
    },
];

// Sauvegarder les données dans le localStorage
localStorage.setItem("eleves", JSON.stringify(eleves));
