"use client";

import React from "react";
import { Card, CardBody, Button, Input } from "@heroui/react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

type RegisterData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

interface RegisterSectionProps {
	registerData: RegisterData;
	isPasswordVisible: boolean;
	isConfirmVisible: boolean;
	isLoading: boolean;
	error: string;
	onFirstNameChange: (value: string) => void;
	onLastNameChange: (value: string) => void;
	onEmailChange: (value: string) => void;
	onPasswordChange: (value: string) => void;
	onConfirmPasswordChange: (value: string) => void;
	onTogglePasswordVisible: () => void;
	onToggleConfirmVisible: () => void;
	onSubmit: (e: React.FormEvent) => void;
	onShowLogin: () => void;
}

export default function RegisterSection({
	registerData,
	isPasswordVisible,
	isConfirmVisible,
	isLoading,
	error,
	onFirstNameChange,
	onLastNameChange,
	onEmailChange,
	onPasswordChange,
	onConfirmPasswordChange,
	onTogglePasswordVisible,
	onToggleConfirmVisible,
	onSubmit,
	onShowLogin,
}: RegisterSectionProps) {
	const { firstName, lastName, email, password, confirmPassword } = registerData;

	const registerFields = [
		{
			key: "firstName",
			group: "name",
			placeholder: "Prénom",
			type: "text",
			value: firstName,
			onChange: onFirstNameChange,
			icon: User,
		},
		{
			key: "lastName",
			group: "name",
			placeholder: "Nom",
			type: "text",
			value: lastName,
			onChange: onLastNameChange,
			icon: User,
		},
		{
			key: "email",
			group: "field",
			placeholder: "Adresse email",
			type: "email",
			value: email,
			onChange: onEmailChange,
			icon: Mail,
		},
		{
			key: "password",
			group: "field",
			placeholder: "Mot de passe",
			type: isPasswordVisible ? "text" : "password",
			value: password,
			onChange: onPasswordChange,
			icon: Lock,
			isPassword: true,
			isVisible: isPasswordVisible,
			onToggleVisible: onTogglePasswordVisible,
		},
		{
			key: "confirmPassword",
			group: "field",
			placeholder: "Confirmer le mot de passe",
			type: isConfirmVisible ? "text" : "password",
			value: confirmPassword,
			onChange: onConfirmPasswordChange,
			icon: Lock,
			isPassword: true,
			isVisible: isConfirmVisible,
			onToggleVisible: onToggleConfirmVisible,
		},
	];

	const nameFields = registerFields.filter((field) => field.group === "name");
	const otherFields = registerFields.filter((field) => field.group === "field");

	return (
		<Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl">
			<CardBody className="gap-6 p-6 sm:p-8">
				<form onSubmit={onSubmit} className="space-y-5">
					{/* Error Message */}
					{error && (
						<div className="p-3 rounded-lg bg-danger/10 border border-danger/50 text-danger text-sm">
							{error}
						</div>
					)}

					{/* Name Inputs */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						{nameFields.map((field) => {
							const IconComponent = field.icon;
							return (
								<Input
									key={field.key}
									placeholder={field.placeholder}
									type={field.type}
									value={field.value}
									onChange={(e) => field.onChange(e.target.value)}
									startContent={<IconComponent size={18} className="text-foreground/40" />}
									classNames={{
										input: "bg-transparent text-foreground",
										inputWrapper:
											"bg-default-200/50 border border-default-300 hover:border-default-400",
									}}
									required
								/>
							);
						})}
					</div>

					{/* Other Inputs */}
					{otherFields.map((field) => {
						const IconComponent = field.icon;
						return (
							<div key={field.key}>
								<Input
									placeholder={field.placeholder}
									type={field.type}
									value={field.value}
									onChange={(e) => field.onChange(e.target.value)}
									startContent={<IconComponent size={18} className="text-foreground/40" />}
									endContent={
										field.isPassword ? (
											<button
												className="focus:outline-none"
												type="button"
												onClick={field.onToggleVisible}
											>
												{field.isVisible ? (
													<EyeOff size={18} className="text-foreground/40" />
												) : (
													<Eye size={18} className="text-foreground/40" />
												)}
											</button>
										) : undefined
									}
									classNames={{
										input: "bg-transparent text-foreground",
										inputWrapper:
											"bg-default-200/50 border border-default-300 hover:border-default-400",
									}}
									required
								/>
							</div>
						);
					})}

					{/* Register Button */}
					<Button
						type="submit"
						className="w-full bg-secondary hover:bg-secondary/90 text-background font-semibold py-2 mt-6"
						size="lg"
						isLoading={isLoading}
						disabled={isLoading}
					>
						S'inscrire
					</Button>
				</form>

				{/* Login Link */}
				<p className="text-center text-sm text-foreground/60">
					Déjà un compte?{" "}
					<button
						type="button"
						onClick={onShowLogin}
						className="text-secondary hover:text-secondary/80 font-semibold cursor-pointer"
					>
						Se connecter
					</button>
				</p>
			</CardBody>
		</Card>
	);
}
