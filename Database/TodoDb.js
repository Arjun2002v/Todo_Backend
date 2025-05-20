cconst mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      "mongodb+srv://arjupallufd:1vF2s9Znq8I5qG0y@backenddev.mc217.mongodb.net/BackendDev?retryWrites=true&w=majority&appName=BackendDev",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;





mongodb+srv://arjun:<db_password>@cluster0.8kbkifv.mongodb.net/