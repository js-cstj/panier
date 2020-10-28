import panier1 from "../panier1.js";
/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		this.ajouterEvenements(panier1);
	}
	/**
	 * Méthode qui met à jour les informations du panier existant
	 * @param {object} objPanier Le panier à faire afficher
	 * @returns undefined Ne retourne rien
	 */
	static updatePanier(objPanier) {
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
