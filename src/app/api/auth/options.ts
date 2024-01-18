import { DB_CONNECTION } from "@/DB/db.config";
import { User } from "@/models/users.models";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	pages: {
		signIn: "login",
	},
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
				DB_CONNECTION();
				const user = await User.findOne({ email: credentials?.email });

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
};
