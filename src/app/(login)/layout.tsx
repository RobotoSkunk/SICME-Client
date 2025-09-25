
import Image from 'next/image';
import { type Metadata } from 'next';

import backgroundImage from '@/assets/img/background.svg';

import { montserrat_medium } from '@/utils/fonts';

import './globals.css';


export async function generateMetadata()
{
	const defaultMetadata = {
		title: 'SICME',
		description: 'Sistema de Inventarios y Control de Mantenimiento de Equipo',
	};

	return {
		title: defaultMetadata.title,
		description: defaultMetadata.description,
		applicationName: defaultMetadata.title,
		twitter: {
			card: 'summary_large_image',
			title: defaultMetadata.title,
			description: defaultMetadata.description,
		},
		openGraph: {
			type: 'website',
			siteName: defaultMetadata.title,
			title: defaultMetadata.title,
			description: defaultMetadata.description,
		},
	} as Metadata;
};

export default function Layout({
	children,
}: {
	children: React.ReactElement;
})
{
	return (
		<html lang='es' suppressHydrationWarning>
			<head>
				<noscript><meta http-equiv="refresh" content={ `0; url=/noscript` }></meta></noscript>
			</head>
			<body
				className={ montserrat_medium.className }
			>
				<Image
					src={ backgroundImage }
					alt=''
					className={ 'background-image' }
				/>
				{ children }
			</body>
		</html>
	);
}
