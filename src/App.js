export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		const app = document.getElementById("app");
		const ul = app.appendChild(document.createElement("ul"));
		this.chargerJson(`/api/produits`).then(donnees => {
			console.log(donnees);
			// Boucle
			donnees.forEach(produit => {
				const li = ul.appendChild(document.createElement("li"));
				const a = li.appendChild(document.createElement("a"));
				a.href = `modifProduit.html?id=${produit.id}`;
				a.innerHTML = produit.titre;
			});
		});
	}
	static mainModifProduit(id) {
		const form = document.forms.modifProduit;
		this.chargerJson(`/api/produits/${id}`).then(donnees => {
			console.log(donnees);
			document.getElementById("imageProduit").src =
				`images/produits/${donnees.numero}/128x128.webp`;
			form.numero.value = donnees.numero;
			form.titre.value = donnees.titre;
			form.description.value = donnees.description;
			form.prix.value = donnees.prix;
		});
		form.addEventListener("submit", e => {
			e.preventDefault();
			const xhr = new XMLHttpRequest();
			xhr.open("post", "/api/produits/" + id);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				console.log(xhr.response);
			});
			const data = new FormData(form);
			xhr.send(data);
		});
	}
	static mainAjoutProduit() {
		const dropArea = document.getElementById('drop-area');
		// Prevent default behavior for drag and drop
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, this.preventDefaults, false);
		});

		// Highlight drop area when a file is being dragged over it
		['dragenter', 'dragover'].forEach(eventName => {
			dropArea.addEventListener(eventName, () => {
				dropArea.style.border = '2px dashed #000';
			}, false);
		});
		['dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, () => {
				dropArea.style.border = '2px dashed #ccc';
			}, false);
		});
		// Handle dropped files
		dropArea.addEventListener('drop', this.handleDrop, false);

		const form = document.forms.ajoutProduit;
		form.addEventListener("submit", e => {
			e.preventDefault();
			const xhr = new XMLHttpRequest();
			xhr.open("post", "/api/produits");
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
	static preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}
	static handleDrop(e) {
		let dt = e.dataTransfer;
		let files = dt.files;
		this.handleFiles(files);
	}
	static handleFiles(files) {
		([...files]).forEach(this.uploadFile);
	}
	static uploadFile(file) {
		let formData = new FormData();
		formData.append('file', file);
		fetch('YOUR_UPLOAD_ENDPOINT', {
			method: 'POST',
			body: formData
		})
			.then(response => {
				if (response.ok) {
					// Handle successful upload
					console.log('File uploaded successfully!');
				} else {
					// Handle error
					console.error('Upload failed');
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}
}

