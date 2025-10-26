import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à SQLite réussie!");
  } catch (error) {
    console.error("Impossible de se connecter à la BDD:", error);
  }
})();

export default sequelize;
