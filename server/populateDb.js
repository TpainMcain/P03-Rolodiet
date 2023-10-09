const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Ensure the path is correct

// Paths to JSON seed data files
const jsonFiles = [
    './recipes.json',
    './seeds/Epithymia.json',
    './seeds/Errinnys.json',
    './seeds/Kakia.json',
    './seeds/Phthonos.json',
    './seeds/Zelos.json',
];

// Function to insert a single data item into the database
const insertData = async (data) => {
  // Check if the 'description' field is missing or empty
  if (!data.description || data.description.trim() === '') {
    console.warn('Skipping document without description:', data.title);
    return;
  }

  try {
    await Recipe.create(data);
  } catch (error) {
    console.error('Error inserting document:', error);
  }
};

// Function to populate the database from JSON files
const populateDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/good-eats', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if the database already contains data
    const recipeCount = await Recipe.countDocuments();
    if (recipeCount > 0) {
      console.log('Database is already populated. Exiting...');
      return;
    }

    // Loop through each JSON file and insert its data
    for (const filePath of jsonFiles) {
      const jsonData = require(filePath);
      for (const data of jsonData) {
        await insertData(data);
      }
    }

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    // Ensure the MongoDB connection is closed
    mongoose.connection.close();
  }
};

// Invoke the main function
populateDatabase();
