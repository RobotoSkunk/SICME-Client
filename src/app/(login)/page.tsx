
'use client';

import Image from 'next/image';
import { useActionState, useState } from 'react';

import sicmeLogo from '@/assets/img/logo/sicme.svg';

import { authenticate } from '../actions/user';
import { montserrat_medium } from '@/utils/fonts';

import style from './page.module.css';


export default function Page()
{
	const [ errorMessage, formAction ] = useActionState(authenticate, undefined);

	return (
		<main className={ style.main }>
			<form action={ formAction }>
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
					/>
					<label htmlFor='password'>Contraseña</label>
				</div>

				<button
					className={[
						montserrat_medium.className,
						style['submit-button'],
					].join(' ')}
				>
					Iniciar Sesión
				</button>
			</form>
		</main>
	);
}
