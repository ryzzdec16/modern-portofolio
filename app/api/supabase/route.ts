import { NextResponse } from 'next/server'
import  supabase  from '@/lib/supabaseClient'

// Contoh route test
export async function GET() {
  const { data, error } = await supabase.from('projects').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
