import { DB_CONNECTION } from "@/DB/db.config";
import { NextResponse, NextRequest } from "next/server";
import { LoginSchema } from "../../../../validations/Schema";
import vine, { errors } from "@vinejs/vine";
import { ErrorReporterI } from "@/validations/ErrorReporter";
import bcryptjs from "bcryptjs";
import { User } from "../../../../models/users.models";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const validate = vine.compile(LoginSchema);
		const data = await validate.validate(body, {
			errorReporter: () => new ErrorReporterI(),
		});

		await DB_CONNECTION();
		// CHECK IF USER EXISTS & IF PASSWORD IS CORRECT
		const user = await User.findOne({ email: body.email }).select("-__v");
		if (!user)
			return NextResponse.json(
				{ status: 400, message: "User & Password is incorrect" },
				{ status: 200 }
			);
		const validPassword = await bcryptjs.compare(data.password, user.password);
		if (!validPassword)
			return NextResponse.json(
				{ status: 400, message: "User & Password is incorrect" },
				{ status: 200 }
			);
		const { password, ...rest } = user.toJSON();
		return NextResponse.json(
			{ status: 200, message: "User logged in!", rest },
			{ status: 200 }
		);
	} catch (error: any) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return NextResponse.json(
				{ errors: error.messages, status: 400 },
				{ status: 200 }
			);
		}
		return NextResponse.json({ errors: error.message }, { status: 500 });
	}
}
