export default class Panier {
	static main() {
		var boutons = document.querySelectorAll("button[data-id]");
		for (let i = 0; i < boutons.length; i += 1) {
			const bouton = boutons[i];
			bouton.addEventListener("click", e => {
				var id = bouton.dataset.id;
				var titre = bouton.dataset.titre;
				document.body.appendChild(this.form_ajout_panier(id, titre));
			});
		}
		var lien_panier = document.getElementById("lien-panier");
		lien_panier.addEventListener("click", e => {
			console.log("Affichage du panier");
			e.preventDefault();
			document.body.appendChild(this.html_panier());
		});
	}
	static form_ajout_panier(id, titre) {
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
		button.addEventListener("click", e => {
			resultat.remove();
		});
		form.addEventListener("submit", e => {
			e.preventDefault();
			console.log("Soumission du formulaire");
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
		var client_id = localStorage.client_id;
		fetch(`http://localhost:8000/api/panier/${client_id}`)
			.then(response => response.json())
			.then(panier => {
				for (let i = 0; i < panier.produits.length; i += 1) {
					var produit = panier.produits[i];
					var li = ul.appendChild(this.html_panier_produit(produit));
					// <div class="total">Total: 1234.00$</div>
				}
				var total = ul.appendChild(document.createElement("li"));
				total.classList.add("total");
				total.innerHTML = `Total: ${panier.total.toFixed(2)} $`;
			})
			.catch(error => console.error(error));
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
		prix.innerHTML = objProduit.prix.toFixed(2) + " $";
		var sous_total = resultat.appendChild(document.createElement("div"));
		sous_total.classList.add("sous-total");
		sous_total.innerHTML = objProduit.sous_total.toFixed(2) + " $";

		return resultat;
	}
}