
import { fetchPost } from '@/app/utils/fetch-api';
import { redirect } from 'next/navigation';


export async function authenticate(_: any, formData: FormData)
{
	const username = formData.get('username');
	const password = formData.get('password');

	if (username == null || password == null) {
		return 'Faltan campos.';
	} 

	try {
		const response = await fetchPost('users/login', {
			username,
			password,
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
