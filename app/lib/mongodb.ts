import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect('mongodb://localhost:27017/AeroCast'); // ไม่ต้องใส่ useNewUrlParser หรือ useUnifiedTopology
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }
}
