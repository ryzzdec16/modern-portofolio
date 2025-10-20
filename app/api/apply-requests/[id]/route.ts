import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { status } = await req.json();
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("apply_requests")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
