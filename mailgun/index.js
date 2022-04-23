// La ligne suivante ne doit être utilisée qu'une seule fois et au tout début du projet. De préférence dans index.js
require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

/* MAILGUN CONFIGURATION */
const api_key = process.env.API_KEY; /* VOTRE CLÉ API */
const domain = process.env.SANDBOX_DOMAIN; /* VOTRE DOMAINE SANDBOX */
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

app.get("/", (req, res) => {
  res.send("server is up");
});

app.post("/form", (req, res) => {
  //   Le console.log de req.fields nous affiche les données qui ont été rentrées dans les inputs (dans le formulaire frontend) :

  console.log(req.fields);

  //   On crée un objet data qui contient des informations concernant le mail (qui m'envoie le mail, adresse vers laquelle je veux envoyer le mail, titre et contenu du mail) :
  const data = {
    from: `${req.fields.prenom} ${req.fields.nom} <${req.fields.email}>`,
    to: "william.patrick.piron@gmail.com",
    subject: "Formulaire JS",
    text: req.fields.message,
  };

  //   Fonctions fournies par le package mailgun pour créer le mail et l'envoyer :
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      // s'il n'y a pas eu d'erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :
      res.json({ message: "Erreur" });
      // } else {
      //   // s'il y a eu une erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :

      //   res.json(error);
    }
    alert("Votre message a bien été envoyé, merci !");
    console.log(body);
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is listening");
});
