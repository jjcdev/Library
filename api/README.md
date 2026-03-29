Api_lib 2026
Commit: `www.github.com/jjcdev/library`
Par: JJC DEV
<----- ROUTES ----->

===> ROUTES PUBLIQUES
Login (connexion): /api_lib/login
    Method: POST
    body:{
        email: String,
        password: String
    }

    Reponse: {
        message: String,
        token: String,
        user: Object
    }

Signup (inscription): /api_lib/signup
    Method: POST
    body:{
        firstname: String,
        lastname: String,
        email: String(50),
        password: String
    }

    Reponse: {
        success: boolean,
        message: String
    }

===> ROUTES PRIVEES (après connexion)

** Au chargement de la page **
List : /api_lib/list
Description: Liste de touts les livres présents dans la bibli
Method: GET

    Reponse: {
        message: String,
        books: Array
    }

** Commandes **
Add : api_lib/add
Description: Ajouter un livre
Method: POST
    body:{
        name: String,
        author: String,
        year: INTEGER,
        size: INTEGER
    }

Delete : /api_lib/delete
Description: Supprimer un livre
Method: DELETE
    body:{
        id: String
    }

<--------- PAR RAPPORT ET AUX TOKENS --------->

Le access token envoyé ne dure que 1h
Le refresh token envoyé ne dure que 30 jours

Après la connexion, au bout de 1h, le serveur renvoie une erreur 403
La vue doit alors automatiquement faire une requête GET (api_lib/refresh)
pour recevoir de nouveaux tokens sans quoi l'utilisateur sera déconnecté!

ATTENTION
Chaque requete mise a part celle du login et signup doit porter en en-tete (header) le access token et le refresh token courant