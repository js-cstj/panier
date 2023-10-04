/**************************************************************
 * IMPORTANT! POUR CHANGER DE PANIER, CHANGER LE FICHIER ICI
 */
// import panier from "../panier1.js";
import panier from "../panier2.js";
// import panier from "../panier3.js";	// Créer un panier3.js avec '/MONCLIENT/index.html'

export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		this.ajouterEvenements(panier);
	}
	/**
	 * Méthode qui remplace le panier HTML actuel par un nouveau panier généré à partir de l'objet panier donné en paramètre
	 * @param {object} objPanier Le panier à faire afficher
	 * @returns undefined Ne retourne rien
	 */
	static updatePanier(objPanier) {
		// On récupère le panier HTML désuet
		var vieux = document.getElementById("panier");
		// On génère un nouveau panier HTML
		var nouveau = this.html_panier(objPanier);
		// On remplace le vieux par le nouveau
		vieux.parentElement.replaceChild(nouveau, vieux);
	}
	/**
	 * Retourne un nouveau panier HTML en fonction de l'objet panier fourni
	 * @param {object} objPanier 
	 * @returns HTMLElement Le div#panier complet
	 */
	static html_panier(objPanier) {
		var resultat;
		// Panier
		resultat = document.createElement("div");
		resultat.id = "panier";
		// Bouton close
		var close = resultat.appendChild(document.createElement("span"));
		close.classList.add("close");
		// Gros titre
		var h1 = resultat.appendChild(document.createElement("h1"));
		h1.innerHTML = "Mon panier";
		// Items (boucle)
		for (let i = 0; i < objPanier.achats.length; i += 1) {
			let achat = objPanier.achats[i];
			let produit = objPanier.produits[achat.numero];
			resultat.appendChild(this.html_item(produit, achat.quantite));
		}
		// Grand total
		var gTotal = resultat.appendChild(document.createElement("div"));
		gTotal.classList.add("grand-total");
		gTotal.innerHTML = this.grandTotal(objPanier).toFixed(2) + " $";
		return resultat;
	}
	/**
	 * Retourne une rangée (un produit) du panier HTML
	 * @param {object} objProduit L'objet représentant le produit à afficher
	 * @param {number} quantite La quantité de ce produit
	 * @returns {HTMLElement} Le div.item du produit
	 */
	static html_item(objProduit, quantite) {
		var resultat;
		resultat = document.createElement("div");
		resultat.classList.add("item");
		// Image
		var img = resultat.appendChild(document.createElement("img"));
		img.src = objProduit.image;
		img.alt = objProduit.titre;
		// Titre
		var titre = resultat.appendChild(document.createElement("div"));
		titre.classList.add("titre");
		titre.innerHTML = objProduit.titre;
		// Description
		var description = resultat.appendChild(document.createElement("div"));
		description.classList.add("description");
		description.innerHTML = objProduit.description;
		// Prix
		var prix = resultat.appendChild(document.createElement("div"));
		prix.classList.add("prix");
		prix.innerHTML = objProduit.prix.toFixed(2) + " $";
		// Quantité
		var divQuantite = resultat.appendChild(document.createElement("div"));
		divQuantite.classList.add("quantite");
		divQuantite.innerHTML = quantite;
		// Total
		var total = objProduit.prix * quantite;
		var divTotal = resultat.appendChild(document.createElement("div"));
		divTotal.classList.add("total");
		divTotal.innerHTML = total.toFixed(2) + " $";
		return resultat;
	}
	/**
	 * Retourne le grand total des articles du panier
	 * @param {object} objPanier L'objet panier en entier à traiter
	 * @returns {number} Le grand total
	 */
	static grandTotal(objPanier) {
		var resultat = 0;
		for (let i = 0; i < objPanier.achats.length; i += 1) {
			let achat = objPanier.achats[i];
			let produit = objPanier.produits[achat.numero];
			resultat += produit.prix * achat.quantite;
		}
		return resultat;
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
		})
	}
}
