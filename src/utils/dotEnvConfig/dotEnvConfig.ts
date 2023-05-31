import * as dotenv from "dotenv";
dotenv.config();

const env: { [key: string]: string } = {
    PORT: <string>process.env.PORT,
    DATABASE_URL: <string>process.env.DATABASE_URL,
    JWTSECRET: <string>process.env.JWTSECRET,
    JWTREFRESHSECRET: <string>process.env.JWTREFRESHSECRET,
};

for (const property in env) {
    if (!env[property])
        throw Error(`Environment variable ${property} not set!`);
}

export default env;