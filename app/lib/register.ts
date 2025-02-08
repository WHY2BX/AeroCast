import bcrypt from "bcryptjs";
import user from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";

export async function registerUser(email: string, password: string, name: string) {
  await connectDB(); // เชื่อมต่อ MongoDB

  // ตรวจสอบว่ามีอีเมลนี้อยู่แล้วหรือไม่
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // เข้ารหัสรหัสผ่าน
  const hashedPassword = await bcrypt.hash(password, 10);

  // สร้างผู้ใช้ใหม่
  const newUser = await user.create({
    email,
    password: hashedPassword,
    name,
  });

  return newUser;
}
