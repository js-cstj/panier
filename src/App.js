import Panier from "./Panier.js";
import Produit from "./Produit.js";

export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		Produit.main().then(produits => {
			Panier.main();
		});
		if (!localStorage.client_id) {
			document.body.appendChild(this.html_login());
			document.getElementById("login").addEventListener("submit", e => {
				e.preventDefault();
				var nom = document.getElementById("nom").value;
				var courriel = document.getElementById("courriel").value;
				fetch("http://localhost:8000/api/clients", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ nom: nom, courriel: courriel })
				})
					.then(response => response.json())
					.then(client => {
						localStorage.client_id = client.id;
						document.getElementById("backdrop").remove();
					})
					.catch(error => console.error(error));
			});
		}
	}
	static html_login() {
		var resultat = document.createElement("div");
		resultat.id = "backdrop";
		var form = resultat.appendChild(document.createElement("form"));
		form.action = "";
		form.id = "login";
		form.name = "login";
		form.classList.add("popup");
		var h1 = form.appendChild(document.createElement("h1"));
		h1.innerHTML = "Connexion";
		var label = form.appendChild(document.createElement("label"));
		label.setAttribute("for", "nom");
		label.innerHTML = "Nom";
		var input = form.appendChild(document.createElement("input"));
		input.type = "text";
		input.name = "nom";
		input.id = "nom";
		input.required = true;
		input.value = "Jean Tremblay";
		var label = form.appendChild(document.createElement("label"));
		label.setAttribute("for", "courriel");
		label.innerHTML = "Courriel";
		var input = form.appendChild(document.createElement("input"));
		input.type = "email";
		input.name = "courriel";
		input.id = "courriel";
		input.required = true;
		input.value = "jean-tremblay@ici.com";
		var button = form.appendChild(document.createElement("button"));
		button.type = "submit";
		button.innerHTML = "Entrer";
		return resultat;
	}

	/**
	 * Méthode qui met à jour les informations du panier existant
	 * @param {object} objPanier Le panier à faire afficher
	 * @returns undefined Ne retourne rien
	 */
	static updatePanier(objPanier) {
		var gTotal = 0;
		for (let i = 0; i < objPanier.achats.length; i += 1) {
			var achat = objPanier.achats[i];
			var produit = objPanier.produits[achat.numero];
			var img = document.querySelector("#panier>div.item:nth-of-type(" + (i + 1) + ")>img");
			img.src = produit.image;
			var titre = document.querySelector("#panier>div.item:nth-of-type(" + (i + 1) + ")>.titre");
			titre.innerHTML = produit.titre;
			var description = document.querySelector("#panier>div.item:nth-of-type(" + (i + 1) + ")>.description");
			description.innerHTML = produit.description;
			var prix = document.querySelector("#panier>div.item:nth-of-type(" + (i + 1) + ")>.prix");
			prix.innerHTML = produit.prix.toFixed(2) + " $";
			var quantite = document.querySelector("#panier>div.item:nth-of-type(" + (i + 1) + ")>.quantite");
			quantite.innerHTML = achat.quantite;
			var ttl = achat.quantite * produit.prix;
			var total = document.querySelector("#panier>div.item:nth-of-type(" + (i + 1) + ")>.total");
			total.innerHTML = ttl.toFixed(2) + " $";
			gTotal += ttl;
		}
		var grandTotal = document.querySelector("#panier>div.grand-total");
		grandTotal.innerHTML = gTotal.toFixed(2) + " $";
	}
	/**
	 * Méthode qui ajoute les événements relatifs à l'ouverture et à la fermeture du panier
	 * Remarque: cette méthode est complète
	 * @param {object} panier 
	 * @returns undefined Ne retourne rien
	 */
	static ajouterEvenements(panier) {
		// Ouverture du panier
		var lienPanier = document.getElementById("lien-panier");
		lienPanier.addEventListener("click", e => {
			e.preventDefault();
			document.body.classList.add("affiche-panier");
			this.updatePanier(panier);
		});
		// Fermeture du panier
		var backdrop = document.querySelector("#backdrop");
		backdrop.addEventListener("click", e => {
			if (e.target.closest(".close")) {
				document.body.classList.remove("affiche-panier");
			}
			if (e.target.closest("#panier")) {
				return;
			}
			document.body.classList.remove("affiche-panier");
		});
		// Fermeture du panier avec Escape
		window.addEventListener("keydown", e => {
			if (e.key === "Escape") {
				document.body.classList.remove("affiche-panier");
			}
		});
	}
}

