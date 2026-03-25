"use client";

import React from "react";
import Image from "next/image";
import logo from "@/assets/ISEN-logo.jpg";

export default function LoginHeader() {
	return (
		<div className="w-full max-w-md">
			{/* Logo */}
			<div className="flex justify-center mb-3">
				<Image
					src={logo}
					alt="ClubIsen Logo"
					width={80}
					height={80}
					priority
				/>
			</div>

			{/* Title */}
			<div className="text-center mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
					Connexion
				</h1>
				<p className="text-foreground/60">
					Accédez à votre compte ClubIsen
				</p>
			</div>
		</div>
	);
}
