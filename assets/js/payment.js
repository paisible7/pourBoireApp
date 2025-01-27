document.getElementById("payment-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission classique du formulaire

    // Récupérer les données du formulaire
    const prenom = document.getElementById("prenom").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const classe = document.getElementById("classe").value;
    const fraisInscription = parseFloat(document.getElementById("frais-inscription").value);
    const documents = document.getElementById("documents").files[0]; // Fichier soumis

    // Vérifier que les données sont valides
    if (!prenom || !nom || !classe || !fraisInscription || !documents) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Stocker l'élève en attente de confirmation
    const inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];
    inscriptions.push({
        prenom,
        nom,
        classe,
        fraisInscription,
        documents: documents.name, // On stocke juste le nom du fichier (pour l'exemple)
        status: "En attente de confirmation",
    });

    localStorage.setItem("inscriptions", JSON.stringify(inscriptions));

    alert(`Paiement de ${fraisInscription} FCFA confirmé pour ${prenom} ${nom}.`);
    this.reset(); // Réinitialiser le formulaire
});
