import panier1 from "../panier1.js";
import panier2 from "../panier2.js";
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
			document.body.classList.add("panier");
			this.updatePanier(panier1);
		});
		var backdrop = document.querySelector("#backdrop");
		backdrop.addEventListener("click", e => {
			if (e.target.closest(".close")) {
				document.body.classList.remove("panier");
			}
			if (e.target.closest("#panier")) {
				return;
			}
			document.body.classList.remove("panier");
		});
	}
	static updatePanier(panier) {
		var divPanier = document.getElementById("panier");
		divPanier.parentElement.replaceChild(this.html_panier(panier), divPanier);
	}
	static html_panier(panier) {
		var resultat;
		resultat = document.createElement("div");
		resultat.id = "panier";
		var close = resultat.appendChild(document.createElement("span"));
		close.classList.add("close");
		var h1 = resultat.appendChild(document.createElement("h1"));
		h1.innerHTML = "Mon panier";
		for (let i = 0; i < panier.achats.length; i += 1) {
			let achat = panier.achats[i];
			let produit = panier.produits[achat.numero];
			resultat.appendChild(this.html_item(produit, achat.quantite));
		}
		var gTotal = resultat.appendChild(document.createElement("div"));
		gTotal.classList.add("grand-total");
		gTotal.innerHTML = this.grandTotal(panier).toFixed(2) + " $";
		return resultat;
	}
	static grandTotal(panier) {
		var resultat = 0;
		for (let i = 0; i < panier.achats.length; i += 1) {
			let achat = panier.achats[i];
			let produit = panier.produits[achat.numero];
			resultat += produit.prix * achat.quantite;
		}
		return resultat;
	}
	static html_item(produit, quantite) {
		var resultat;
		resultat = document.createElement("div");
		resultat.classList.add("item");
		var img = resultat.appendChild(document.createElement("img"));
		img.src = produit.image;
		img.alt = produit.titre;
		var titre = resultat.appendChild(document.createElement("div"));
		titre.classList.add("titre");
		titre.innerHTML = produit.titre;
		var description = resultat.appendChild(document.createElement("div"));
		description.classList.add("description");
		description.innerHTML = produit.description;
		var prix = resultat.appendChild(document.createElement("div"));
		prix.classList.add("prix");
		prix.innerHTML = produit.prix.toFixed(2) + " $";
		var divQuantite = resultat.appendChild(document.createElement("div"));
		divQuantite.classList.add("quantite");
		divQuantite.innerHTML = quantite;
		var total = produit.prix * quantite;
		var divTotal = resultat.appendChild(document.createElement("div"));
		divTotal.classList.add("total");
		divTotal.innerHTML = total.toFixed(2) + " $";
		return resultat;
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
