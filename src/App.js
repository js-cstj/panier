export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		const app = document.getElementById("app");
		const ul = app.appendChild(document.createElement("ul"));
		this.chargerJson('http://localhost:8888/api/produits').then(donnees => {
			donnees.forEach(produit => {
				const li = ul.appendChild(document.createElement("li"));
				const a = li.appendChild(document.createElement("a"));
				const img = a.appendChild(document.createElement("img"));
				img.src = `images/produits/${produit.numero}/32x32.webp`;
				a.href = "produits.html?id=" + produit.id;
				a.style.display = "flex";
				a.appendChild(document.createTextNode(produit.titre));
				console.log(produit);
			});
		});
	}
	static mainModifProduit(id) {
		const form = document.forms.modifProduit;
		this.chargerJson("http://localhost:8888/api/produits/" + id).then(donnees => {
			form.numero.value = donnees.numero;
			form.titre.value = donnees.titre;
			form.description.value = donnees.description;
			form.prix.value = donnees.prix;
		});
		form.addEventListener("submit", e => {
			e.preventDefault();
			const xhr = new XMLHttpRequest();
			xhr.open("post", "http://localhost:8888/api/produits/" + id);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				location.href = "index.html";
			});
			const data = new FormData(form);
			xhr.send(data);
		});
	}
	static mainAjoutProduit() {
		const form = document.forms.ajoutProduit;
		form.addEventListener("submit", e => {
			e.preventDefault();
			const xhr = new XMLHttpRequest();
			xhr.open("post", "http://localhost:8888/api/produits");
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				console.log(xhr.response);
			});
			const data = new FormData(form);
			xhr.send(data);
		});
	}
	static chargerJson(url) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				resolve(e.target.response); // Retourne les données
			});
			xhr.send();
		});
	}
}
