import mongoose from "mongoose";
import {unique} from "next/dist/build/utils";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: [true, "Name is required"],
	},
	email: {
		type: Schema.Types.String,
		unique: true,
		trim: true,
		required: [true, "Email is required"],
	},
	password: {
		type: Schema.Types.String,
		required: [true, "Password is required"],
	},
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
