export default class Panier {
	static main() {
		// Commencer par la fonction html_ajout_panier
		// On ajoute un écouteur d'événement sur tous les boutons "Ajouter au panier"
		// On récupère tous les boutons "Ajouter au panier"
		var boutons = document.querySelectorAll("button.ajouter");
		// Boucle qui parcourt tous les boutons
		for (let i = 0; i < boutons.length; i += 1) {
			const bouton = boutons[i];
			// Ajoute un écouteur d'événement 'click' sur chaque bouton
			bouton.addEventListener("click", e => {
				// Le id et le titre du produit sont stockés dans les attributs data-id et data-titre
				// On peut récupérer ces valeurs avec bouton.dataset.id et bouton.dataset.titre
				var id = bouton.dataset.id;
				var titre = bouton.dataset.titre;
				// On affiche le formulaire d'ajout au panier
				document.body.appendChild(this.form_ajout_panier(id, titre));
			});
		}
		// Compléter les fonctions html_panier et html_panier_produit avant d'ajouter l'événement
		// On ajoute un écouteur d'événement sur le lien "Mon panier"
		// L'événement ajoute directement le HTML du panier dans le body
		var lien_panier = document.getElementById("lien-panier");
		lien_panier.addEventListener("click", e => {
			e.preventDefault();
			document.body.appendChild(this.html_panier());
		});
	}

	/**
	 * Crée et retourne le HTML du formulaire d'ajout au panier
	 * @param {number} id Le id du produit
	 * @param {string} titre Le titre du produit
	 * @returns HTMLElement Le HTML du formulaire d'ajout au panier (voir le fichier index.html)
	 */
	static form_ajout_panier(id, titre) {
		// Rite de passage. On commence par créer le HTML du formulaire d'ajout au panier
		var resultat = document.createElement("div");
		resultat.id = "backdrop";
		var form = resultat.appendChild(document.createElement("form"));
		form.action = "";
		form.id = "ajout_panier";
		form.name = "ajout_panier";
		form.classList.add("popup");
		var h1 = form.appendChild(document.createElement("h1"));
		h1.innerHTML = "Ajouter au panier";
		var label = form.appendChild(document.createElement("label"));
		label.setAttribute("for", "quantite");
		label.innerHTML = titre;
		var input = form.appendChild(document.createElement("input"));
		input.type = "number";
		input.name = "quantite";
		input.id = "quantite";
		input.value = "1";
		input.size = "3";
		input.required = true;
		var input = form.appendChild(document.createElement("input"));
		input.type = "hidden";
		input.name = "produit_id";
		input.id = "produit_id";
		input.value = id;
		var input = form.appendChild(document.createElement("input"));
		input.type = "hidden";
		input.name = "client_id";
		input.id = "client_id";
		input.value = localStorage.client_id;
		var div = form.appendChild(document.createElement("div"));
		var button = div.appendChild(document.createElement("button"));
		button.type = "submit";
		button.innerHTML = "Ajouter";
		var button = div.appendChild(document.createElement("button"));
		button.type = "button";
		button.id = "annuler";
		button.innerHTML = "Annuler";
		// Fin du rite de passage

		// On ajoute un écouteur d'événement "click" sur le formulaire qui détruit le formulaire (et le backdrop)
		button.addEventListener("click", e => {
			resultat.remove();
		});
		// On ajoute un écouteur d'événement "submit" sur le formulaire
		form.addEventListener("submit", e => {
			e.preventDefault();
			// Envoie les données du formulaire à l'adresse http://localhost:8000/api/client_produit
			// Voir le login dans App.js pour voir comment envoyer des données avec fetch
			// Ensuite, on détruit le formulaire (et le backdrop)
			var formData = new FormData(form);
			const options = {
				method: "POST",
				body: formData
			};
			fetch("http://localhost:8000/api/client_produit", options)
				.then(response => response.json())
				.then(panier => {
					console.log(panier);
					resultat.remove();
				})
				.catch(error => console.error(error));
		});

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
		// On récupère le panier du client à l'aide de chargerJSON
		var client_id = localStorage.client_id;
		// L'adresse est http://localhost:8000/api/panier/9
		// 9 doit être remplacé par le id du client
		// Le id du client est stocké dans localStorage.client_id
		fetch(`http://localhost:8000/api/panier/${client_id}`)
			.then(response => response.json())
			.then(panier => {
				// Une boucle qui parcourt tous les produits du panier
				for (let i = 0; i < panier.produits.length; i += 1) {
					// On ajoute le HTML du produit dans le ul à l'aide de html_panier_produit
					var produit = panier.produits[i];
					var li = ul.appendChild(this.html_panier_produit(produit));
				}
				// On ajoute le total du panier à la fin du ul. Il n'y a pas de calcul à faire, le total est déjà calculé dans le JSON
				var total = ul.appendChild(document.createElement("li"));
				total.classList.add("total");
				total.innerHTML = `Total: ${(panier.total * 1).toFixed(2)} $`;
			})
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