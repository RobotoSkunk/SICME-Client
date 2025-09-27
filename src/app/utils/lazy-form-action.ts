
import React, { startTransition } from 'react';


export default function lazyFormAction(ev: React.FormEvent<HTMLFormElement>, payload: (data: FormData) => void)
{
	ev.preventDefault();
	const form = ev.currentTarget;

	if (!form.checkValidity()) {
		form.reportValidity();
		return;
	}

	startTransition(() => payload(new FormData(form)));
}
