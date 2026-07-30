import { supabase } from "@/lib/supabase";

export type Profile = {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
};

export async function getProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      phone
    `)
    .order("full_name", {
      ascending: true,
    });

  if (error) throw error;

  return data as Profile[];
}
export async function getProfileById(
  id: string
) {
  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      phone
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Profile;
}

export async function updateProfile(
  id: string,
  profile: Partial<Profile>
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Profile;
}
export async function deleteProfile(
  id: string
) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) throw error;
}