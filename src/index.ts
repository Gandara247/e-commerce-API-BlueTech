import { env } from "process";
import api from "./utils/api/api";


api.listen(env.PORT, () => console.log("🎲 Successfully connected to the database!"));