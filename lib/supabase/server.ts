import { createClient } from "@supabase/supabase-js";

// Server-only keys (jangan pernah dikirim ke browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);
