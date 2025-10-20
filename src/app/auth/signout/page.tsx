'use client'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function SignOutPage() {
    const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const handleLogOut = async () => {
      await supabase.auth.signOut();
      router.push("/auth/login");
    };
    handleLogOut();
  }, [router, supabase]);

  return (
    <div>

    </div>
  );
}
