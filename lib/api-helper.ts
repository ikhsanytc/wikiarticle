import { ApiOutputType } from "@/types/main";

export class ApiHelper {
  async login(email: string, password: string): Promise<ApiOutputType> {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = (await res.json()) as ApiOutputType;
      return data;
    } catch (e) {
      console.error(e);
      return {
        message: "Unexpected error (helper)",
        error: true,
      };
    }
  }
  async register(
    email: string,
    username: string,
    password: string
  ): Promise<ApiOutputType> {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      const data = (await res.json()) as ApiOutputType;
      return data;
    } catch (e) {
      console.error(e);
      return {
        message: "Unexpected error. (helper)",
        error: true,
      };
    }
  }
}
