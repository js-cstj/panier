/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		var app = document.getElementById("app");
		var lienPanier = document.getElementById("lien-panier");
		lienPanier.addEventListener("click", e => {
			document.body.classList.toggle("panier");
		});
		var close = document.querySelector("#panier > .close");
		close.addEventListener("click", e => {
			document.body.classList.toggle("panier");
		});
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
