import { DB_CONNECTION } from "@/DB/db.config";
import { NextResponse, NextRequest } from "next/server";
import { schema as registerSchema } from "../../../../validations/Schema";
import vine, { errors } from "@vinejs/vine";
import { ErrorReporterI } from "@/validations/ErrorReporter";
import bcryptjs from "bcryptjs";
import { User } from "../../../../models/users.models";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const validate = vine.compile(registerSchema);
		const data = await validate.validate(body, {
			errorReporter: () => new ErrorReporterI(),
		});
		await DB_CONNECTION();
		// check if user already exists
		const user = await User.findOne({ email: body.email });
		if (user) {
			return NextResponse.json(
				{ status: 400, message: "User is already exists" },
				{ status: 200 }
			);
		}

		// hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(data.password, salt);

		// create user
		const newUser = await User.create({ ...data, password: hashedPassword });
		return NextResponse.json(
			{ status: 200, message: "User created!", newUser },
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return NextResponse.json(
				{ status: 400, errors: error.messages },
				{ status: 200 }
			);
		}
	}
}
