const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To DB.");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); 
    }
}


module.exports=connectToDB