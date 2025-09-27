"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import logoImage from "@/assets/img/logo/sicme-white.svg";
import hamburguerIcon from "@/assets/icons/hamburger.svg";

export function NavBar() {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div className="bg-(--primary)">
				<div className="flex flex-col items-center gap-2 md:flex-row">
					<button onClick={() => setOpen(!open)} className="cursor-pointer">
						<Image
							src={hamburguerIcon}
							alt="Logo de menú hamburguesa"
							className="h-15 w-min"
						/>
					</button>
					<div className="relative">
						<Image
							src={logoImage}
							alt="Logo de SICME"
							className="h-15 w-min p-2"
						/>
						<Link
							className="absolute top-0 left-0 z-10 h-full w-full text-amber-50"
							href="/panel"
						/>
					</div>
				</div>
			</div>
			<div
				className={`fixed -left-full z-1 h-screen w-64 border-r border-(--details) p-3 ${open ? "left-0" : "left-full"}`}
			>
				<p>Panel de Información</p>
			</div>
		</div>
	);
}
