import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Path parameter is required" }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is doctor or the file belongs to them
    const patientId = path.split("/")[0]; // First part of path is patientId

    if (user.role !== 'doctor' && user.id !== patientId) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    // Get the file from Supabase storage
    const { data, error } = await supabase.storage
      .from("archivos_pacientes")
      .download(path);

    if (error) {
      console.error("Error downloading file:", error);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Extract filename from path
    const fileName = path.split("/").pop() || "consulta.pdf";

    // Return the file as a response
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`);

    return new NextResponse(data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error in download API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}