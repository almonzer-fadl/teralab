import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function saveWorkshopPlan(planData: any) {
  const { data, error } = await supabase
    .from('workshop_plans')
    .insert([planData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveUser(userData: any) {
  const { data, error } = await supabase
    .from('users')
    .upsert([userData], { onConflict: 'email' })
    .select()
    .single();

  if (error) throw error;
  return data;
}   