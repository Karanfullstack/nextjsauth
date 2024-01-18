import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/options";
import Button from "@/components/Button";

export default async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/login");
	} else {
		console.log(session);
	}
	return (
		<div className="h-screen w-full flex justify-center gap-5 flex-col items-center">
			<h1 className="text-2xl font-semibold">Welcome To Next Auth.</h1>
			<div>
				<h2 className="text-3xl font-semibold">Profile</h2>
				<p className="text-lg font-semibold">{session?.user?.email}</p>
				<p>{session?.user?.name}</p>
			</div>
			<div className=" border place-self-center">
				<Button />
			</div>
		</div>
	);
}
