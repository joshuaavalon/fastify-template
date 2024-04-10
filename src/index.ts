import { config } from "dotenv";
import { pino } from "pino";
import { readConfig } from "#config";
import { init } from "#init";

async function main(): Promise<void> {
  try {
    config();
    const cfg = readConfig();
    const app = await init(cfg);
    const { host, port } = cfg.system;
    await app.listen({ host, port });
  } catch (err) {
    pino().info({ err }, "test");
  }
}

main();
