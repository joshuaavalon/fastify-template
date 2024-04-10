import { DateTime } from "luxon";

import type { onRequestAsyncHookHandler } from "fastify";

export const verifySession: onRequestAsyncHookHandler = async function verifyUser(req) {
  const { auth, url, method } = req.routeOptions.config;
  if (!auth) {
    req.log.debug({ url, method }, "Skip verifySession because `auth` is not configured");
    return;
  }
  const { expiredAt } = req.session;
  if (!expiredAt) {
    delete req.session.userId;
    return;
  }
  const expiredDateTime = DateTime.fromISO(expiredAt);
  if (!expiredDateTime.isValid || expiredDateTime > DateTime.now()) {
    delete req.session.userId;
  }
};
