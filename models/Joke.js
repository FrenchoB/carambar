import dataTypes from "sequelize";
import sequelize from "../database/database.js";

//Définition du modèle Joke
const Joke = sequelize.define("Joke", {
  id: {
    type: dataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: dataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: dataTypes.STRING,
    allowNull: false,
  },
});

export default Joke;
