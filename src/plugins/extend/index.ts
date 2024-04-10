import fp from "fastify-plugin";
import { StatusCodes } from "#utils";
import { isFresh } from "./func/is-fresh.js";
import { httpSend } from "./func/http-send.js";
import { apiSend } from "./func/api-send.js";
import { fileSend } from "./func/file-send.js";

const name = "#plugins/extend";

type EnumKeys<Enum> = Exclude<keyof Enum, number>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const enumObject = <Enum extends Record<string, number | string>>(e: Enum) => {
  const copy = { ...e } as { [K in EnumKeys<Enum>]: Enum[K] };
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete, array-callback-return
  Object.values(e).forEach(value => typeof value === "number" && delete copy[value]);
  return copy;
};


export default fp(
  async app => {
    for (const [status, code] of Object.entries(enumObject(StatusCodes))) {
      if (isNaN(Number(status))) {
        app.decorateReply(status, httpSend(code));
      }
    }
    app.decorateReply("apiSend", apiSend);
    app.decorateReply("fileSend", fileSend);
    app.decorateReply("isFresh", isFresh);
  },
  {
    name,
    fastify: "4.x",
    dependencies: [],
    decorators: { request: ["session"] }
  }
);
