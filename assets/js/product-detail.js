import { data } from "./global.js";

const id = location.hash.substring(1) || 1;
const currentData = data.find(x => x.id == id);