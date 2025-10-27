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
