import { redirect } from 'next/navigation';
import { ResponseAPI } from './definitions';

var endpoint: string | undefined = process.env.NODE_ENV === 'production'
    ? process.env.API_URL_PRODUCTION
    : 'http://localhost:5137';

export async function authenticate(previousState: any, formData: FormData) {
	const username = formData.get('username');
	const password = formData.get('password');

	if(username == null || password == null){
		return 'Credenciales incorrectas.'
	} 

	try{
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

		if (data.code < 0) {
			return 'Ha ocurrido un error interno.';
		}

		if (data.code > 0) {
			return data.message;
		}

	}catch(error: any){
		return 'Ha ocurrido un error interno.';
	}

	redirect('/panel');
}