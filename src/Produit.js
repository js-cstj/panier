export default class Produit {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		return fetch("http://localhost:8000/api/produits")
			.then(response => response.json())
			.then(produits => {
				document.getElementById("produits").replaceWith(this.html_produits(produits));
			})
			.catch(error => console.error(error));
	}
	static html_produits(produits) {
		var resultat = document.createElement("div");
		resultat.id = "produits";
		for (let i = 0; i < produits.length; i += 1) {
			var produit = produits[i];
			var div = this.html_produit(produit);
			resultat.appendChild(div);
		}
		return resultat;
	}
	static html_produit(objProduit) {
		var resultat = document.createElement("div");
		resultat.classList.add("produit");

		var figure = resultat.appendChild(document.createElement("figure"));
		var image = figure.appendChild(document.createElement("img"));
		image.src = `images/produits/${objProduit.numero}/256x256.webp`;
		image.alt = objProduit.titre;
		var figcaption = figure.appendChild(document.createElement("figcaption"));
		figcaption.innerHTML = objProduit.numero;
		var body = resultat.appendChild(document.createElement("div"));
		body.classList.add("body");
		var titre = body.appendChild(document.createElement("h2"));
		titre.innerHTML = objProduit.titre;
		var description = body.appendChild(document.createElement("p"));
		description.classList.add("description");
		description.innerHTML = objProduit.description;
		var prix = body.appendChild(document.createElement("p"));
		prix.classList.add("prix");
		prix.innerHTML = (objProduit.prix * 1).toFixed(2) + " $";
		var bouton = body.appendChild(document.createElement("button"));
		bouton.type = "button";
		bouton.innerHTML = "Ajouter au panier";
		bouton.dataset.id = objProduit.id;
		bouton.dataset.titre = objProduit.titre;
		return resultat;
	}

}