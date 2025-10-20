import { User } from '@supabase/supabase-js';

export function getUserRole(user: User | null): string | null {
  return user?.app_metadata?.role || null;
}