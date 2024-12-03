import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  try {
    const supabase = await createClient();
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code!);
      if (error) {
        return NextResponse.json(
          {
            message: error.message,
            error: true,
          },
          {
            status: 500,
          }
        );
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.json(
      {
        message: "Code not found",
        error: true,
      },
      {
        status: 400,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Unexpected error. (server)",
        error: true,
      },
      {
        status: 500,
      }
    );
  }
}
