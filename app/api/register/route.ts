import { createClient } from "@/lib/supabase/server";
import { ApiOutputType } from "@/types/main";
import { NextRequest, NextResponse } from "next/server";

type ReqLoginType = {
  email: string;
  username: string;
  password: string;
};

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiOutputType>> {
  const { email, username, password }: ReqLoginType = await req.json();
  if (!email || !username || !password) {
    return NextResponse.json(
      {
        message: "Bad Request. (server)",
        error: true,
      },
      {
        status: 400,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          email,
          username,
          avatar_url: "",
        },
        emailRedirectTo: "http://127.0.0.1:3000/api/callback",
      },
    });
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
    return NextResponse.json({
      message: "OK",
      error: false,
    });
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
