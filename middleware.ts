import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Ambil session user Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname, searchParams } = req.nextUrl;

  // ======================================================
  // 🔒 1️⃣ Lindungi /login dengan secret key dari .env.local
  // ======================================================
  if (pathname === "/login") {
    const key = searchParams.get("key");
    const validKey = process.env.LOGIN_KEY;

    if (!key || key !== validKey) {
      // redirect kalau kunci tidak valid
      return NextResponse.redirect(new URL("/", req.url));
    }

    // jika kunci valid → izinkan lanjut
    return res;
  }

  // ======================================================
  // 🧩 2️⃣ Jangan proteksi API route (biarkan bebas)
  // ======================================================
  if (pathname.startsWith("/api")) {
    return res;
  }

  // ======================================================
  // 🧱 3️⃣ Proteksi semua route dashboard dengan Supabase Auth
  // ======================================================
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // ======================================================
  // ✅ 4️⃣ Lanjutkan request jika semua kondisi aman
  // ======================================================
  return res;
}

// Terapkan middleware hanya ke dashboard dan login
export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
