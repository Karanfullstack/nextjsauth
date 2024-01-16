import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: [true, "Name is required"],
	},
	email: {
		type: Schema.Types.String,
		required: [true, "Email is required"],
	},
	password: {
		type: Schema.Types.String,
		required: [true, "Password is required"],
	},
});

export const User = mongoose.models.users || mongoose.model("User", UserSchema);
