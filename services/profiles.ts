import { supabase } from "@/lib/supabase";

export type Profile = {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  cpf: string | null;
  cep: string | null;
  street: string | null;
  number: string | null;
  complement: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
};

const profileFields = `
  id,
  full_name,
  email,
  phone,
  cpf,
  cep,
  street,
  number,
  complement,
  neighborhood,
  city,
  state
`;

export async function getProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select(profileFields)
    .order("full_name", {
      ascending: true,
    });

  if (error) throw error;

  return data as Profile[];
}

export async function getProfileById(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select(profileFields)
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
    .select(profileFields)
    .single();

  if (error) throw error;

  return data as Profile;
}

export async function deleteProfile(id: string) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
