
import Image from 'next/image';

import logo from '@/assets/img/logo/sicme.svg';


export default function Page()
{
	return (<>
		Hola, buenas noches

		<p style={{ alignContent: 'center' }}>
			<Image
				src={ logo }
				alt='Prueba'

				width={ 1000 }
			/>
		</p>

		{ [... new Array(100)].map((_, i) =>
		(
			<p key={ i }>Texto de prueba { i + 1 }</p>
		)) }
	</>);
}
