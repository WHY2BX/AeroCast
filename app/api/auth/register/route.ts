import { NextResponse } from "next/server";
import { registerUser } from "@/app/lib/register";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    console.log( {name, email, password} );
    const newUser = await registerUser(name, email, password);
    return NextResponse.json(newUser, {status:201})
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
} 
