
'use client';

import Image from 'next/image';
import { startTransition, useActionState } from 'react';

import sicmeLogo from '@/assets/img/logo/sicme.svg';

import { authenticate } from '../actions/user';
import { montserrat_medium } from '@/utils/fonts';

import style from './page.module.css';
import lazyFormAction from '../utils/lazy-form-action';


export default function Page()
{
	const [ errorMessage, loginAction, isPending ] = useActionState(authenticate, null);

	return (
		<main className={ style.main }>
			<form
				onSubmit={ (ev) => lazyFormAction(ev, loginAction) }
			>
				<Image
					src={ sicmeLogo }
					alt={ 'Logo de SICME' }
				/>
				{ errorMessage && (
					<p className={ style.error }>{errorMessage}</p>
				)}

				<div
					className={ style.input }
				>
					<input
						type='text'
						id='username'
						name='username'
						placeholder=' '

						className={ montserrat_medium.className }
						required
					/>
					<label htmlFor='username'>Usuario</label>
				</div>

				<div
					className={ style.input }
				>
					<input
						type='password'
						id='password'
						name='password'
						placeholder=' '

						className={ montserrat_medium.className }
						required
					/>
					<label htmlFor='password'>Contraseña</label>
				</div>

				<button
					className={[
						montserrat_medium.className,
						style['submit-button'],
					].join(' ')}

					disabled={ isPending }
				>
					Iniciar Sesión
				</button>
			</form>
		</main>
	);
}
