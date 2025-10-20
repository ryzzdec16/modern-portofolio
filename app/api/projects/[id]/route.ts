import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";

// 🟢 UPDATE PROJECT
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIX: await params
    const body = await req.json();

    const { error } = await supabase
      .from("projects")
      .update(body)
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json({ message: "Project updated successfully ✅" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🔴 DELETE PROJECT
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIX: await params

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Project deleted successfully 🗑️" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
