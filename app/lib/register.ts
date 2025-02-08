import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import connectDB from "@/app/lib/mongodb";

export async function registerUser(name: string, email: string, password: string) {
  await connectDB(); // เชื่อมต่อ MongoDB

  // ตรวจสอบว่ามีอีเมลนี้อยู่แล้วหรือไม่
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // เข้ารหัสรหัสผ่าน
  const hashedPassword = await bcrypt.hash(password, 10);

  // สร้างผู้ใช้ใหม่
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
  });
  console.log("User to save:", newUser);

  return newUser;
}
