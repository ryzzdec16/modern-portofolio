import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";

// 🟢 GET — Ambil semua request
export async function GET() {
  const { data, error } = await supabase
    .from("apply_requests")
    .select("*")
    .order("id", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 🟡 PUT — Update status (accept / reject)
export async function PUT(req: Request) {
  const { id, status } = await req.json();

  const { error } = await supabase
    .from("apply_requests")
    .update({ status })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Status updated successfully" });
}
