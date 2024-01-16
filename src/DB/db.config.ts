import mongoose, {Connection} from "mongoose";

const {MONGO_URI} = process.env;

if (!MONGO_URI) {
	throw new Error("Please define mongodb string");
}

let cachedConnection: Connection | null = null;

export const DB_CONNECTION = async () => {
	if (cachedConnection) {
		console.log("Using cached connection");
		return cachedConnection;
	}
	const DB = await mongoose.connect(MONGO_URI, {tls: true});
	cachedConnection = DB.connection;
	console.log("New connection");
	return DB.connection;
};
