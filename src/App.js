export default class App {
    static main() {
        const divProduits = document.getElementById("produits");
        const ul = divProduits.appendChild(document.createElement("ul"));
        ul.style.display = "grid";
        ul.style.gridTemplateColumns = "repeat(auto-fill, 200px)";
        this.chargerJson('http://localhost:8888/api/produits').then(donnees => {
            const tProduits = donnees;
            tProduits.forEach(produit => {
                console.log(produit);
                const li = ul.appendChild(document.createElement("li"));
                const a = li.appendChild(document.createElement("a"));
                a.style.display = "flex";
                const img = a.appendChild(document.createElement("img"));
                img.src = `images/produits/${produit.numero}/64x64.webp`;
                a.appendChild(document.createTextNode(produit.titre));
                a.href = "produits.html?id=" + produit.id;
            });
        });
    }
    static mainAjoutProduit() {
        const form = document.forms.ajoutProduit;
        form.addEventListener("submit", e => {
            const xhr = new XMLHttpRequest();
            xhr.open("post", 'http://localhost:8888/api/produits');
            xhr.responseType = "json";
            xhr.addEventListener("load", e => {
                console.log(xhr.response);
                location.href = "index.html";
            });
            var data = new FormData(form);
            xhr.send(data);
        });
    }
    static mainModifProduit(id) {
        const form = document.forms.modifProduit;
        this.chargerJson('http://localhost:8888/api/produits/' + id).then(donnees => {
            const objProduit = donnees;
            form.numero.value = objProduit.numero;
            form.titre.value = objProduit.titre;
            form.description.value = objProduit.description;
            form.prix.value = objProduit.prix;
        });
        form.addEventListener("submit", e => {
            const xhr = new XMLHttpRequest();
            xhr.open("post", 'http://localhost:8888/api/produits/' + id);
            xhr.responseType = "json";
            xhr.addEventListener("load", e => {
                console.log(xhr.response);
                // location.href = "index.html";
            });
            var data = new FormData(form);
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