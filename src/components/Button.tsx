"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Button = () => {
	return (
		<button
			onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
			className="w-full bg-purple-300 p-2 px-4 font-semibold"
		>
			Logout
		</button>
	);
};

export default Button;
