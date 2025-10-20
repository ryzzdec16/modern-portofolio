import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 🟢 GET — ambil semua project
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ GET /api/projects error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🟡 POST — tambah project baru
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tech = formData.get("tech") as string;
    const github_url = formData.get("github_url") as string;
    const demo_url = formData.get("demo_url") as string;
    const file = formData.get("image") as File | null;

    let image_url = "";

    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabaseServer.storage
        .from("project-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabaseServer.storage
        .from("project-images")
        .getPublicUrl(fileName);

      image_url = publicUrlData.publicUrl;
    }

    const { data, error } = await supabaseServer
      .from("projects")
      .insert([
        {
          title,
          description,
          tech: tech.split(",").map((t) => t.trim()),
          github_url,
          demo_url,
          image: image_url,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (err: any) {
    console.error("❌ POST /api/projects error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
