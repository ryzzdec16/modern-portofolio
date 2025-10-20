import { NextResponse } from "next/server"
import supabase from "@/lib/supabaseClient"

// Ambil semua apply requests
export async function GET() {
  const { data, error } = await supabase
    .from("apply_requests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// Kirim apply baru
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { client_name, email, message, project_id } = body

    const { data, error } = await supabase
      .from("apply_requests")
      .insert([{ client_name, email, message, project_id }])
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
