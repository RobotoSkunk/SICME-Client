
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, stagger, Variants } from 'framer-motion';

import style from './style.module.css';
import { montserrat_medium } from '@/utils/fonts';

import imgLogoWhite from '@/assets/img/logo/sicme-white.svg';
import imgHamburguerIcon from '@/assets/img/icons/hamburger.svg';
import imgArrowIcon from '@/assets/img/icons/arrow-small.svg';


type Section = {
	name: string;
	content: {
		name: string;
		path: string;
		permissions: boolean; // En forma de concepto...
	}[];
};

const sections: Section[] = [
	{
		name: 'Sección 1',
		content: [
			{
				name: 'Página 1',
				path: '#',
				permissions: true,
			},
			{
				name: 'Página 2',
				path: '#',
				permissions: true,
			},
			{
				name: 'Página 3',
				path: '#',
				permissions: true,
			},
			{
				name: 'Página 4',
				path: '#',
				permissions: true,
			},
		],
	},
	{
		name: 'Sección 2',
		content: [
			{
				name: 'Página 1',
				path: '#',
				permissions: true,
			},
			{
				name: 'Página 2',
				path: '#',
				permissions: true,
			},
			{
				name: 'Página 3',
				path: '#',
				permissions: true,
			},
		],
	},
	{
		name: 'Sección 3',
		content: [
			{
				name: 'Página 1',
				path: '#',
				permissions: true,
			},
			{
				name: 'Página 2',
				path: '#',
				permissions: true,
			},
			{
				name: 'Página 3',
				path: '#',
				permissions: true,
			},
		],
	},
];



function SectionComponent({
	data,
}: {
	data: Section;
})
{
	const [ open, setOpen ] = useState(true);

	function handleClick()
	{
		setOpen(!open);
	}


	const contentVariants = {
		open: {
			height: 'auto',
			transition: {
				duration: 0.25,
				delayChildren: stagger(0.1, { startDelay: 0.2 }),
			},
		},
		closed: {
			height: 0,
		},
	} satisfies Variants;

	const linkVariants = {
		open: {
			x: 0,
			opacity: 1,
		},
		closed: {
			x: -15,
			opacity: 0,
		},
	} satisfies Variants;


	return (
		<motion.div
			className={ style.section }
		>
			<button
				className={ montserrat_medium.className }
				onClick={ handleClick }
			>
				<AnimatePresence initial={ false }>
					<motion.span
						className={ style.arrow }

						transition={{
							type: 'tween',
							duration: 0.20,
						}}

						animate={{
							rotate: open ? 180 : 0,
						}}
					>
						<Image
							src={ imgArrowIcon }
							alt=''
							width={ 15 }
						/>
					</motion.span>
				</AnimatePresence>
				{ data.name }
			</button>
			<AnimatePresence initial={ false }>
				<motion.div
					className={ style['section-content'] }
					variants={ contentVariants }

					animate={ open ? 'open' : 'closed' }
					initial='closed'
				>
					{ data.content.map((value, i) =>
					(
						<motion.span
							key={ `${value.name}-${i}` }
							className={ style.link }

							variants={ linkVariants }
						>
							<Link href={ value.path }>
								{ value.name }
							</Link>
						</motion.span>
					)) }
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
}


export default function DashboardContainer({
	children,
}: {
	children?: React.ReactNode;
})
{
	const [ openNavbar, setOpenNavbar ] = useState(true);

	function toggleNavbar()
	{
		setOpenNavbar(!openNavbar);
	}


	const navbarVariants = {
		open: {
			x: 0,
		},
		closed: {
			x: 'calc(-100% - 25px)',
		},
	} satisfies Variants;
	

	return (<>
		<header className={ style.header }>
			<button onClick={ toggleNavbar }>
				<Image
					src={ imgHamburguerIcon }
					alt='Abrir menú de navegación'
					width={ 40 }
				/>
			</button>
			<Image
				src={ imgLogoWhite }
				alt='Logo del sistema de inventarios y control de mantenimiento de equipo'
				height={ 40 }

				className={ style.logo }
			/>
		</header>
		<div className={ style.content }>
			<AnimatePresence initial={ false }>
				<motion.main
					key='main'

					style={{
						flexGrow: 1,
						width: '100vw',
					}}

					layout='preserve-aspect'
				>
					{ children }
				</motion.main>

				{ openNavbar &&
					<motion.nav
						className={ style.navbar }
						variants={ navbarVariants }

						key='navbar'

						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 30,
							duration: 0.35,
						}}

						initial='closed'
						animate='open'
						exit='closed'
					>
						{ sections.map((section, i) =>
						(
							<SectionComponent
								key={ i }
								data={ section }
							/>
						)) }
					</motion.nav>
				}
			</AnimatePresence>
		</div>
	</>);
}
