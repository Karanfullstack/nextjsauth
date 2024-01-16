import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Next Auth",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Enter Your Email",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Enter Your Password",
				},
			},
			async authorize(credentials, req) {
				// logics for authentication
				let user = {
					id: "1",
					name: "J Smith",
					email: credentials?.email,
				};
				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
};
