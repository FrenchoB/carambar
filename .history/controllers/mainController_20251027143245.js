import Joke from "../models/Joke.js";

const index = async (req, res) => {
  console.log("Fonction index appelée !");
  try {
    const jokes = await Joke.findAll();

    res.render("pages/index", { title: "Accueil des blagues Carambar",
      jokes
     });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'affichage de l'accueil : " + error);
  }
};

const createJoke = async (req, res) => {
  console.log("Fonction createJoke appelée !");
  try {
    const { question, answer } = req.body;
    const newJoke = await Joke.create({ question, answer });
    res.status(201).json(newJoke);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la blague." });
  }
};

const getRandomJoke = async (req, res) => {
  console.log("Fonction getRandomJoke appelée !");
  try {
    const count = await Joke.count();
    
    if (count === 0) {
      return res.status(404).json({ error: "Aucune blague disponible" });
    }
    
    const randomIndex = Math.floor(Math.random() * count);
    const randomJoke = await Joke.findOne({ offset: randomIndex });
    
    res.status(200).json(randomJoke);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de la blague aléatoire." });
  }
};

const getJokeById = async (req, res) => {
  console.log("Fonction getJokeById appelée !");
  try {
    console.log("Id reçu :", req.params.id);
    console.log("URL complète :", req.originalUrl);
    const { id } = req.params;
    const joke = await Joke.findByPk(id);

    if (!joke) {
      return res.status(404).json({ error: "Blague non trouvée" });
    }
    res.status(200).json(joke);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la blague." });
  }
};

export default {
  index,
  getRandomJoke,
  createJoke,
  getJokeById,
};
