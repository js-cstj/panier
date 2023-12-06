import Panier from "./Panier.js";
import Produit from "./Produit.js";

export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		Produit.main().then(() => {
			Panier.main();
		});
		if (!localStorage.client_id) {
			document.body.appendChild(this.html_login());
			const formLogin = document.getElementById("login");
			formLogin.addEventListener("submit", e => {
				e.preventDefault();
				const formData = new FormData(formLogin);
				const options = {
					method: "POST",
					body: formData
				};
				fetch("http://localhost:8000/api/clients", options)
					.then(response => response.json())
					.then(client => {
						localStorage.client_id = client.id;
						document.getElementById("backdrop").remove();
					});
			});
		}
	}
	static html_login() {
		var resultat = document.createElement("div");
		resultat.id = "backdrop";
		var form = resultat.appendChild(document.createElement("form"));
		form.action = "";
		form.id = "login";
		form.name = "login";
		form.classList.add("popup");
		var h1 = form.appendChild(document.createElement("h1"));
		h1.innerHTML = "Connexion";
		var label = form.appendChild(document.createElement("label"));
		label.setAttribute("for", "nom");
		label.innerHTML = "Nom";
		var input = form.appendChild(document.createElement("input"));
		input.type = "text";
		input.name = "nom";
		input.id = "nom";
		input.required = true;
		input.value = "Jean Tremblay";
		var label = form.appendChild(document.createElement("label"));
		label.setAttribute("for", "courriel");
		label.innerHTML = "Courriel";
		var input = form.appendChild(document.createElement("input"));
		input.type = "email";
		input.name = "courriel";
		input.id = "courriel";
		input.required = true;
		input.value = "jean-tremblay@ici.com";
		var button = form.appendChild(document.createElement("button"));
		button.type = "submit";
		button.innerHTML = "Entrer";
		return resultat;
	}
}

