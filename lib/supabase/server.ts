import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client (pakai service role key)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);
