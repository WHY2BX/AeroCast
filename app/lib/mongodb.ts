import mongoose from "mongoose";

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MongoURL)
    console.log("Connected db")
  }catch(err){
    console.log(err)
  }
}

export default connectDB