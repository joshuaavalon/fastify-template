import type { onRouteHookHandler } from "fastify";

export const onRoute: onRouteHookHandler = async function (opts) {
  if (!opts.config) {
    opts.config = {};
  }
  opts.config.auth = opts.auth;
};
