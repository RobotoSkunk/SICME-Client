var endpoint: string | undefined = process.env.NODE_ENV === "production"
    ? process.env.API_URL_PRODUCTION
    : "http://localhost:5137";

import { redirect } from "next/navigation";

export async function authenticate(username: string | undefined, password: FormData,) {
	const response = await fetch(endpoint + "/api/users/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username,
			password,
		}),
	});

	if (!response.ok) {
		return {
			message: "Credenciales Invalidad",
		};
	}

	const data = (await JSON.parse(await response.text())) as {
		success: boolean;
		session: string;
	};

	if (!data.success) {
		return {
			message: "Ha oucrrido un error interno.",
		};
	}

	redirect("/dashboard");
}