import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lrmmnwjumwmojsjkbvmi.supabase.co";
const supabaseKey = "sb_publishable_XIEaXDAzZDFmX6XiHspTvA_zXTJR1oj";

export const supabase = createClient(supabaseUrl, supabaseKey);