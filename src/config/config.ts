import dotenv from "dotenv";

const path = process.env.NODE_ENV === "dev" ? ".env" : ".env.test";

dotenv.config({ path })

console.log(`Minha app está usando: ${process.env.DATABASE_URL}`);