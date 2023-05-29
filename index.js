const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Quiche à la rillette",
      level: "Easy Peasy",
      ingredients: ["Quiche", "rillette"],
      cuisine: "Bien franchouillarde",
      creator: "RomRom",
    });
  })
  .then(async () => {
    try {
      await Recipe.insertMany(data);
    } catch (error) {
      console.log(error.message);
    }
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" }
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
