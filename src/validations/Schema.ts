import vine from "@vinejs/vine";

export const schema = vine.object({
	name: vine.string().trim().minLength(2).maxLength(30),
	email: vine.string().email(),
	password: vine.string().minLength(6).maxLength(30).confirmed(),
});

export const LoginSchema = vine.object({
	email: vine.string().email(),
	password: vine.string().minLength(6).maxLength(30),
});
