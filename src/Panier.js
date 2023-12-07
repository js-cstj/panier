export default class Panier {
	static main() {
		// Commencer par la fonction form_ajout_panier
		// On ajoute un écouteur d'événement sur tous les boutons "Ajouter au panier"
		// On récupère tous les boutons "Ajouter au panier"
		var boutons = document.querySelectorAll("button.ajouter");
		// Boucle qui parcourt tous les boutons
			// Ajoute un écouteur d'événement 'click' sur chaque bouton
				// Le id et le titre du produit sont stockés dans les attributs data-id et data-titre
				// On peut récupérer ces valeurs avec bouton.dataset.id et bouton.dataset.titre
				// On affiche le formulaire d'ajout au panier
		// Compléter les fonctions html_panier et html_panier_produit avant d'ajouter l'événement
		// On ajoute un écouteur d'événement sur le lien "Mon panier"
		// L'événement ajoute directement le HTML du panier dans le body
	}

	/**
	 * Crée et retourne le HTML du formulaire d'ajout au panier
	 * @param {number} id Le id du produit
	 * @param {string} titre Le titre du produit
	 * @returns HTMLElement Le HTML du formulaire d'ajout au panier (voir le fichier index.html)
	 */
	static form_ajout_panier(id, titre) {
		// Le id du client est stocké dans localStorage.client_id
		var client_id = localStorage.client_id;
		// Rite de passage. On commence par créer le HTML du formulaire d'ajout au panier
		
		// Fin du rite de passage

		// On ajoute un écouteur d'événement "click" sur le bouton annuler qui détruit le formulaire (et le backdrop)
		
		// On ajoute un écouteur d'événement "submit" sur le formulaire
			// Envoie les données du formulaire à l'adresse http://localhost:8000/api/client_produit
			// Voir le login dans App.js pour voir comment envoyer des données avec fetch
			// Ensuite, on détruit le formulaire (et le backdrop)

		return resultat;
	}
	static html_panier() {
		// Le début du HTML est fourni. Voir plus bas pour la suite
		var resultat = document.createElement("div");
		resultat.id = "backdrop";
		var div = resultat.appendChild(document.createElement("div"));
		div.id = "panier";
		div.classList.add("popup");
		var h1 = div.appendChild(document.createElement("h1"));
		h1.innerHTML = "Panier";
		var ul = div.appendChild(document.createElement("ul"));
		var divBoutons = div.appendChild(document.createElement("div"));
		var button = divBoutons.appendChild(document.createElement("button"));
		button.type = "button";
		button.id = "fermer";
		button.innerHTML = "Fermer";
		button.addEventListener("click", e => {
			resultat.remove();
		});
		var button = divBoutons.appendChild(document.createElement("button"));
		button.type = "button";
		button.id = "acheter";
		button.innerHTML = "Acheter";

		// LA LISTE DES PRODUITS DU PANIER
		// L'adresse est http://localhost:8000/api/panier/9
		// 9 doit être remplacé par le id du client
		// Le id du client est stocké dans localStorage.client_id
		var client_id = localStorage.client_id;
		// On récupère le panier du client à l'aide de chargerJSON
		
			// Une boucle qui parcourt tous les produits du panier
				// On ajoute le HTML du produit dans le ul à l'aide de html_panier_produit
			// On ajoute le total du panier à la fin du ul. Il n'y a pas de calcul à faire, le total est déjà calculé dans le JSON
		
		return resultat;
	}
	static html_panier_produit(objProduit) {
		var resultat = document.createElement("li");
		resultat.classList.add("produit");
		var image = resultat.appendChild(document.createElement("img"));
		image.src = `images/produits/${objProduit.numero}/64x64.webp`;
		image.alt = objProduit.titre;
		var titre = resultat.appendChild(document.createElement("div"));
		titre.innerHTML = objProduit.titre;
		var quantite = resultat.appendChild(document.createElement("div"));
		quantite.classList.add("quantite");
		quantite.innerHTML = objProduit.quantite;
		var prix = resultat.appendChild(document.createElement("div"));
		prix.classList.add("prix");
		prix.innerHTML = (objProduit.prix * 1).toFixed(2) + " $";
		var sous_total = resultat.appendChild(document.createElement("div"));
		sous_total.classList.add("sous-total");
		sous_total.innerHTML = (objProduit.sous_total * 1).toFixed(2) + " $";

		return resultat;
	}
	static chargerJSON(fic) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", fic);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				resolve(e.target.response);
			});
			xhr.send();
		});
	}
}