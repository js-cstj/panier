# Devoir 2

- Travail individuel
- Durée : 1 semaine (plus la relâche)
- Remise: le vendredi 20 octobre 2023 avant 18h00
- Compte pour 5% (ou 10%) de la note finale
- Renommer le dossier de travail pour y inclure votre code de nomenclature __avant__ de le zipper et de le remettre dans le devoir correspondant sur _Teams_

Un panier d'épicerie apparait lorsque l'on clique sur le bouton `Mon panier` et disparait lorsque l'on clique sur le `x`. Par contre les données qu'il contient ne sont pas celles auxquelles on s'attendrait.

Pouvez-vous faire en sorte que les données contenues dans le fichier `panier1.js` s'affiche à la place du _lorem ipsum_?

## Deux approches à reproduire
1. Modifier le panier
   - Dans un premier temps, vous devez __remplacer__ le contenu des balises HTML existantes par les données correspondantes se trouvant dans le fichier `panier1.js` (voir l'exercice "[Sorciere](https://github.com/js-cstj/sorciere)"). 
   - Pour cette approche-ci, vous devez travailler dans le fichier `App_Etape1.js` et exécuter `etape1.html` pour visionner le résultat.
   - Par contre, cette méthode ne serait pas adéquate pour le 2e client (`panier2.js`) qui a choisi trois articles. 
2. Recréer le panier
   - Dans un deuxième temps, vous devrez donc __générer__ le panier en entier avec les bonnes données. 
   - Cette méthode devrait permettre d'avoir autant d'items que l'on veut dans son panier.
   - Pour cette approche, vous devez travailler dans le fichier `App_Etape2.js` et exécuter `etape2.html` pour visionner le résultat.

## Notions couvertes
- Fonctions
- Consultation du DOM
- Modification du DOM (Rite de passage)
- Utilisation de données complexes
- Boucle qui parcourt un tableau

## Fonction à produire pour la 1re approche
- `updatePanier` : Méthode qui met à jour les informations du panier existant.

## Fonctions à produire pour la 2e approche
- `updatePanier` : Méthode qui remplace le panier HTML actuel par un nouveau panier généré à partir de l'objet panier donné **en paramètre**.
- `html_panier` : **Retourne** un nouveau panier HTML en fonction de l'objet panier fourni.
- `html_item` : **Retourne** une rangée (un produit) du panier HTML.
- `grandTotal` : **Retourne** le grand total des articles du panier.

## Et un 3e client⁉️🤔
Pas vraiment... Pour vous assurer que votre code fonctionne bien, vous pouvez tester avec le fichier `panier3.js` qui est généré aléatoirement : Visitez l'adresse suivante : http://localhost:5500/MONCLIENT/index.html et récupérez le fichier `panier3.js`. Votre code devrait fonctionner avec les 3 clients.
> Faites bien attention au numéro de port. Il se peut que vous deviez changer l'adresse pour qu'elle corresponde à votre "Go Live".