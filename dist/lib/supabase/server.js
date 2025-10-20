"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseServer = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseServer = () => (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
exports.supabaseServer = supabaseServer;
