
'use client';

import Image from 'next/image';
import { useActionState, useState } from 'react';

import sicmeLogo from '@/assets/img/logo/sicme.svg';

import { montserrat_medium } from '@/utils/fonts';

import style from './page.module.css';
import { authenticate } from '../actions/user';


export default function Page()
{
	const [ hasInput, setHasInput ] = useState([ false, false ]);
	const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

	function setInputState(index: number, toggle: boolean)
	{
		const tempCopy = [ ...hasInput ];
		tempCopy[index] = toggle;

		setHasInput(tempCopy);
	}

	return (
		<main className={ style.main }>
			<form action={formAction}>
				{errorMessage && (
            	<>
              	<p className="text-sm text-red-500">{errorMessage}</p>
            		</>
         		)}
				<Image
					src={ sicmeLogo }
					alt={ 'Logo de SICME' }
				/>

				<div
					className={[
						style.input,
						hasInput[0] ? style['force-display'] : '',
					].join(' ')}
				>
					<input
						type='text'
						id='username'
						name='username'

						onInput={ (ev) => setInputState(0, ev.currentTarget.value !== '') }
						className={ montserrat_medium.className }
					/>
					<label htmlFor='username'>Usuario</label>
				</div>

				<div
					className={[
						style.input,
						hasInput[1] ? style['force-display'] : '',
					].join(' ')}
				>
					<input
						type='password'
						id='password'
						name='password'

						onInput={ (ev) => setInputState(1, ev.currentTarget.value !== '') }
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
