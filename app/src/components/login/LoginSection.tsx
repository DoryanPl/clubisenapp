"use client";

import React from "react";
import { Card, CardBody, Button, Input, Checkbox, Link } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginSectionProps {
	email: string;
	password: string;
	isVisible: boolean;
	rememberMe: boolean;
	isLoading: boolean;
	error: string;
	onEmailChange: (value: string) => void;
	onPasswordChange: (value: string) => void;
	onToggleVisible: () => void;
	onRememberChange: (checked: boolean) => void;
	onSubmit: (e: React.FormEvent) => void;
	onShowRegister: () => void;
}

export default function LoginSection({
	email,
	password,
	isVisible,
	rememberMe,
	isLoading,
	error,
	onEmailChange,
	onPasswordChange,
	onToggleVisible,
	onRememberChange,
	onSubmit,
	onShowRegister,
}: LoginSectionProps) {
	return (
		<div>
			<Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl">
				<CardBody className="gap-6 p-6 sm:p-8">
					<form onSubmit={onSubmit} className="space-y-5">
						{/* Error Message */}
						{error && (
							<div className="p-3 rounded-lg bg-danger/10 border border-danger/50 text-danger text-sm">
								{error}
							</div>
						)}

						{/* Email Input */}
						<div>
							<Input
								type="email"
								placeholder="Adresse email"
								value={email}
								onChange={(e) => onEmailChange(e.target.value)}
								startContent={<Mail size={18} className="text-foreground/40" />}
								classNames={{
									input: "bg-transparent text-foreground",
									inputWrapper:
										"bg-default-200/50 border border-default-300 hover:border-default-400",
								}}
								required
							/>
						</div>

						{/* Password Input */}
						<div>
							<Input
								placeholder="Mot de passe"
								value={password}
								onChange={(e) => onPasswordChange(e.target.value)}
								type={isVisible ? "text" : "password"}
								startContent={<Lock size={18} className="text-foreground/40" />}
								endContent={
									<button
										className="focus:outline-none"
										type="button"
										onClick={onToggleVisible}
									>
										{isVisible ? (
											<EyeOff size={18} className="text-foreground/40" />
										) : (
											<Eye size={18} className="text-foreground/40" />
										)}
									</button>
								}
								classNames={{
									input: "bg-transparent text-foreground",
									inputWrapper:
										"bg-default-200/50 border border-default-200 hover:border-default-400",
								}}
								required
							/>
						</div>

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between">
							<Checkbox
								isSelected={rememberMe}
								onChange={(e) => onRememberChange(e.target.checked)}
								classNames={{ label: "text-sm text-foreground" }}
							>
								Se souvenir de moi
							</Checkbox>
							<Link
								href="#"
								className="text-sm text-secondary hover:text-secondary/80 font-medium"
							>
								Mot de passe oublié?
							</Link>
						</div>

						{/* Login Button */}
						<Button
							type="submit"
							className="w-full bg-secondary hover:bg-secondary/90 text-background font-semibold py-2 mt-6"
							size="lg"
							isLoading={isLoading}
							disabled={isLoading}
						>
							Se Connecter
						</Button>
					</form>

					{/* Divider */}
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-default-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-primary/90 text-foreground/60">Ou</span>
						</div>
					</div>

					{/* Sign Up Link */}
					<p className="text-center text-sm text-foreground/60">
						Pas encore de compte ?{" "}
						<button
							type="button"
							onClick={onShowRegister}
							className="text-secondary hover:text-secondary/80 font-semibold cursor-pointer"
						>
							Inscrivez-vous
						</button>
					</p>
				</CardBody>
			</Card>
		</div>
	);
}
