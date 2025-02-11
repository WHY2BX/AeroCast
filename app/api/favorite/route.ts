import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb"; // เชื่อมต่อ MongoDB
import FavoriteLocation from "@/app/models/FavoriteLocation"; // นำเข้าโมเดล

export async function GET(request: Request) {
  try {
    await connectDB(); // เชื่อมต่อฐานข้อมูล

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // ค้นหาสถานที่โปรดของผู้ใช้
    const favorite = await FavoriteLocation.findOne({ userId });

    if (!favorite) {
      return NextResponse.json({ favorites: [] }, { status: 200 });
    }

    return NextResponse.json({ favorites: favorite.locations }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorite locations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB(); // เชื่อมต่อฐานข้อมูล

    const body = await request.json();
    const { userId, name, latitude, longitude } = body;

    if (!userId || !name || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // เพิ่ม favorite location ในรูปแบบ array (push เข้าไปใน locations)
    const favorite = await FavoriteLocation.findOneAndUpdate(
      { userId }, // ค้นหา document ตาม userId
      {
        $push: {
          locations: {
            name,
            latitude,
            longitude,
          },
        },
      },
      { new: true, upsert: true } // ถ้ายังไม่มี document ให้สร้างใหม่
    );

    return NextResponse.json({ message: "Favorite location added", favorite }, { status: 201 });
  } catch (error) {
    console.error("Error adding favorite location:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB(); // เชื่อมต่อฐานข้อมูล

    const body = await request.json();
    const { userId, name } = body;

    if (!userId || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ลบ location ที่มีชื่อตรงกันออกจาก array
    const favorite = await FavoriteLocation.findOneAndUpdate(
      { userId },
      { $pull: { locations: { name } } }, // ลบ location ที่ตรงกับ name
      { new: true }
    );

    if (!favorite) {
      return NextResponse.json({ error: "Favorite location not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Favorite location removed", favorite }, { status: 200 });
  } catch (error) {
    console.error("Error removing favorite location:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
