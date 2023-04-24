import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const mongoose_uri = process.env.MONGOOSE_URI;