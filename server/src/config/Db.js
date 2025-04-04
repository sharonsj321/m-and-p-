const mongoose = require('mongoose');
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected successfully");
        
    } catch (error) {
        console.log("Mongodb connection Failed",error.message);
        
    }
}

module.exports=connectDb  //connect db export cheythit index.js inte ullil poyi call cheyanam