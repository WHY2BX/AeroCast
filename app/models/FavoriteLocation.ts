const mongoose = require("mongoose");

// สร้าง Schema สำหรับ favorite location
const FavoriteLocationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // อ้างอิงไปยัง User
    required: true,
    ref: "User",
  },
  locations: [
    {
      name: { type: String, required: true }, // ชื่อสถานที่ (เช่น ชื่อเมือง)
      latitude: { type: Number, required: true }, // ละติจูด
      longitude: { type: Number, required: true }, // ลองจิจูด
      createdAt: { type: Date, default: Date.now }, // วันที่เพิ่ม
    },
  ],
});

// สร้าง Model
const FavoriteLocation =
  mongoose.models.FavoriteLocation || mongoose.model("FavoriteLocation", FavoriteLocationSchema);

export default FavoriteLocation;