var endpoint: string | undefined = process.env.NODE_ENV === "production"
    ? process.env.API_URL_PRODUCTION
    : "http://localhost:5137";

import { redirect } from "next/navigation";
import { ResponseAPI } from "./definitions";

export async function authenticate(username: string | undefined, password: FormData,) {
	const response = await fetch(endpoint + "/api/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username,
			password,
		}),
	});

	if (!response.ok) {
		return {
			message: "Ha oucrrido un error interno.",
		};
	}

	const data = (await JSON.parse(await response.text())) as ResponseAPI;

	if (data.code < 0) {
		return {
			message: "Ha oucrrido un error interno.",
		};
	}

	if (data.code > 0) {
		return {
			message: "Credenciales incorrectas.",
		};
	}

	redirect("/dashboard");
}