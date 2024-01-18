"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RegisterTypeError } from "@/types";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const params = useSearchParams();
	const [loading, setLoading] = useState<boolean>(false);

	const [authState, setAuthState] = useState({
		email: "",
		password: "",
	});
	
	const [errors, setErrors] = useState<RegisterTypeError>({});
	const [message, setMessage] = useState<string>("");
	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setMessage("");
		setErrors({});
		try {
			setLoading(true);
			const response = await axios.post("/api/auth/login", authState);
			const { data } = response;
			if (data.status === 400) {
				setMessage(data?.message);
				setErrors(data?.errors);
				console.log(data);
			} else if (data.status === 200) {
				console.log(data);
				// router.replace("/");
				signIn("credentials", {
					email: authState.email,
					password: authState.password,
					callbackUrl: "/",
					redirect: true,
				});
			}
		} catch (error: any) {
			console.log("error from catch", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<section className=" ">
			<div className="grid grid-cols-1 w-full   ">
				<div className="flex items-center   border-green-500   justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
					<div className="xl:mx-auto  xl:w-full xl:max-w-sm w-full max-w-md ">
						<h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
							Login
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							Don&apos;t have an account?{" "}
							<Link
								href="/register"
								title=""
								className="font-semibold text-black transition-all duration-200 hover:underline"
							>
								Create a free account
							</Link>
						</p>
						{params.get("message") && (
							<p className="bg-green-200  my-1 rounded-md w-full p-3">
								{params.get("message")}
							</p>
						)}

						<form onSubmit={submitForm} className="mt-8">
							<p className="text-red-400 p-3 font-semibold text-sm">
								{message && message}
							</p>
							<div className="space-y-5">
								<div>
									<label
										htmlFor=""
										className="text-base font-medium text-gray-900"
									>
										{" "}
										Email address{" "}
									</label>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="email"
											placeholder="Email"
											onChange={(e) =>
												setAuthState({ ...authState, email: e.target.value })
											}
										></input>
									</div>
									<span className="text-red-400 font-semibold text-sm">
										{errors?.email}
									</span>
								</div>
								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor=""
											className="text-base font-medium text-gray-900"
										>
											{" "}
											Password{" "}
										</label>
									</div>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="password"
											placeholder="Password"
											onChange={(e) =>
												setAuthState({ ...authState, password: e.target.value })
											}
										></input>
									</div>
									<span className="text-red-400 font-semibold text-sm">
										{errors?.password}
									</span>
								</div>
								<div>
									<button
										type="submit"
										className={`${
											loading && "bg-gray-700"
										} inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
									>
										{loading ? "wait.." : "Login"}{" "}
										<ArrowRight className="ml-2" size={16} />
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
