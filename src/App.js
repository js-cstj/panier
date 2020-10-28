import panier1 from "../panier1.js";
import panier2 from "../panier2.js";
/**
 * IDENTIFICATION DE L'ÉQUIPE
 * ÉLÈVE :
 * ÉLÈVE :
 * ÉLÈVE :
 */
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		/**************************************************************
		 * IMPORTANT! POUR CHANGER DE PANIER, CHANGER LA VARIABLE ICI
		 */
		this.ajouterEvenements(panier2);
	}
	/**
	 * Méthode qui remplace le panier HTML actuel par un nouveau panier généré à partir de l'objet panier donné en paramètre
	 * @param {object} objPanier Le panier à faire afficher
	 * @returns undefined Ne retourne rien
	 */
	static updatePanier(objPanier) {
		// On récupère le panier HTML désuet
		// On génère un nouveau panier HTML
		// On remplace le vieux par le nouveau avec replaceChild
	}
	/**
	 * Retourne un nouveau panier HTML en fonction de l'objet panier fourni
	 * @param {object} objPanier 
	 * @returns HTMLElement Le div#panier complet
	 */
	static html_panier(objPanier) {
		var resultat;
		// Panier
		// Bouton close
		// Gros titre
		// Items (boucle)
		// Grand total
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
		// Image
		// Titre
		// Description
		// Prix
		// Quantité
		// Total
		return resultat;
	}
	/**
	 * Retourne le grand total des articles du panier
	 * @param {object} objPanier L'objet panier en entier à traiter
	 * @returns {number} Le grand total
	 */
	static grandTotal(objPanier) {
		var resultat = 0;
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
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns undefined Ne retourne rien
	 */
	static init() {
		window.addEventListener("load", () => {
			this.main();
		});
	}
}
App.init();
