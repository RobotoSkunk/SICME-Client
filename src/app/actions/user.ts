
import { redirect } from 'next/navigation';

var endpoint: string | undefined = process.env.NEXT_PUBLIC_API_ENDPOINT;


export async function authenticate(_: any, formData: FormData)
{
	const username = formData.get('username');
	const password = formData.get('password');

	if (username == null || password == null) {
		return 'Faltan campos.';
	} 

	try {
		const response = await fetch(endpoint + '/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password,
			}),
		});

		if (!response.ok) {
			return 'Ha ocurrido un error interno.';
		}

		const data = (await JSON.parse(await response.text())) as ResponseAPI;

		if (data.code != 0) {
			return data.message;
		}

	} catch (_) {
		return 'Ha ocurrido un error interno.';
	}

	redirect('/panel');
}
