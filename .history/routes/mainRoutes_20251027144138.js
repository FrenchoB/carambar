import express from "express";
import mainController from "../controllers/mainController.js";
const mainRouter = express.Router();

/**
 * @swagger
 * /api/v1/blagues:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   question:
 *                     type: string
 *                     example: "Quelle est la femelle du hamster ?"
 *                   answer:
 *                     type: string
 *                     example: "L'amsterdam"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
mainRouter.get("/", mainController.index);

/**
 * @swagger
 * /api/random-joke:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     description: Retourne une blague Carambar aléatoire parmi toutes les blagues disponibles dans la base de données
 *     tags:
 *       - Blagues
 *     responses:
 *       200:
 *         description: Blague aléatoire récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identifiant unique de la blague
 *                   example: 42
 *                 question:
 *                   type: string
 *                   description: Question de la blague
 *                   example: "Qu'est-ce qu'un crocodile qui surveille une piscine ?"
 *                 answer:
 *                   type: string
 *                   description: Réponse de la blague
 *                   example: "Un Lacoste de sauvetage !"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date de création de la blague
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date de dernière modification
 *       404:
 *         description: Aucune blague disponible dans la base de données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Aucune blague disponible"
 *       500:
 *         description: Erreur serveur lors de la récupération de la blague
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la récupération de la blague aléatoire."
 */
mainRouter.get('/random-joke', mainController.getRandomJoke)

/**
 * @swagger
 * /api/v1/addBlague:
 *   post:
 *     summary: Crée une nouvelle blague
 *     tags: [Blagues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Que dit un oignon quand il se cogne ?"
 *               answer:
 *                 type: string
 *                 example: "Aïe"
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *       500:
 *         description: Erreur serveur
 */
mainRouter.post("/addJoke", mainController.createJoke);

/**
 * @swagger
 * /api/v1/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     tags: [Blagues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la blague
 *     responses:
 *       200:
 *         description: Blague trouvée
 *       404:
 *         description: Blague non trouvée
 */
mainRouter.get("/:id", mainController.getJokeById);

export default mainRouter;
