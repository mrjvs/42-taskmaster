import { parse } from "yaml"

const config = parse("./config.yaml");

export const conf = config;
