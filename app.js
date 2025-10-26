import express from "express";
import ejs from "ejs";
import expressLayouts from "express-ejs-layouts";
import sequelize from "./database/database.js";
import mainRoutes from "./routes/mainRoutes.js";
import Joke from "./models/Joke.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

//Installation d'Express
const app = express();

//Middlewares paramètrage Express + EJS
app.use(express.json()); //Parse les requêtes JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //Accès aux fichiers statiques
app.use(expressLayouts); //Utilisation de express-ejs-layouts

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Utilisateurs",
      version: "1.0.0",
      description: "API CRUD avec SQLite pour gestion des blagues Carambar",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Serveur de développement",
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger lit les commentaires dans les routes
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Route pour la documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//Route Api
app.use("/api/v1", mainRoutes);

//Config template EJS
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layout");

// // Chargement des documents Swagger
// const swaggerDocument = YAML.load("./swagger.yaml");

//Connexion à la database
async function start() {
  await sequelize.sync();
  app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
  });
}

start();
