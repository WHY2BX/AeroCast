import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // ใช้สำหรับเข้ารหัสรหัสผ่าน

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // ดึงข้อมูลผู้ใช้จาก Database (ใช้ Prisma หรือ DB อื่น)
        const user = await getUserByEmail(credentials.email);
        if (!user) throw new Error("User not found");

        // ตรวจสอบรหัสผ่าน
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) throw new Error("Invalid password");

        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" }, // ถ้าล็อกอินล้มเหลวจะไปที่หน้า /login
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// 📌 Mock Function (ใช้จริงควรเชื่อมต่อ Database)
async function getUserByEmail(email: string) {
  const mockUser = { id: "1", name: "John Doe", email: "john@example.com", password: await bcrypt.hash("password123", 10) };
  return email === mockUser.email ? mockUser : null;
}
