"use client";

import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {type FormEvent, useState} from "react";

export default function LoginPage() {
	const [authState, setAuthState] = useState({
		email: "",
		password: "",
	});

	const submitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(authState);
		(event.target as HTMLFormElement).reset();
	};
	return (
		<section className=" ">
			<div className="grid grid-cols-1 w-full   ">
				<div className="flex items-center  border border-green-500   justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
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
						<form onSubmit={submitForm} className="mt-8">
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
												setAuthState({...authState, email: e.target.value})
											}
										></input>
									</div>
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
												setAuthState({...authState, password: e.target.value})
											}
										></input>
									</div>
								</div>
								<div>
									<button
										type="submit"
										className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
									>
										Login <ArrowRight className="ml-2" size={16} />
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
