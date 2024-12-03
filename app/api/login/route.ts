import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type ReqType = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const { email, password }: ReqType = await req.json();
  if (!email || !password) {
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(email, password);
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
