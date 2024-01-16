import {DB_CONNECTION} from "@/DB/db.config";
import {NextResponse, NextRequest} from "next/server";
import {schema as registerSchema} from "../../../../validations/Schema";
import vine, {errors} from "@vinejs/vine";
import {ErrorReporterI} from "@/validations/ErrorReporter";

DB_CONNECTION();
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const validate = vine.compile(registerSchema);
		const data = await validate.validate(body, {
			errorReporter: () => new ErrorReporterI(),
		});
		return NextResponse.json(data, {status: 200});
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return NextResponse.json(error.messages, {status: 422});
		}
	}
}
