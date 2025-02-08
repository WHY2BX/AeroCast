import { NextResponse } from "next/server";
import { registerUser } from "@/app/lib/register";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB()
    const { name, email, password } = await request.json();
    console.log({ name, email, password });
    const newUser = await registerUser(name, email, password);
    await newUser.save()
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
