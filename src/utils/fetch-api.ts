
var prefix: string | undefined = process.env.NEXT_PUBLIC_API_ENDPOINT;


export async function fetchPost(endpoint: string, content: object)
{
	return await fetch(`${prefix}/${endpoint}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(content),
	})
}

export async function fetchGet(endpoint: string, content: FormData | string)
{
	return await fetch(`${prefix}/${endpoint}`, {
		method: 'GET',
		body: content,
	});
}
