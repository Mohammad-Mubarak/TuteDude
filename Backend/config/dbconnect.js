
require("dotenv").config()
const mongo = require("mongoose")
const mongo_url = process.env.MONGO_DB_URL


// Connecting to MongoDB
mongo.connect(mongo_url).then(() => {
  console.log("Successfully connected")
}).catch((error) => {
  console.log("Connection failed: ", error.message)
  process.exit(1)
});
