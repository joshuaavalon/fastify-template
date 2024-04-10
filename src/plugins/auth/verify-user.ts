import { DateTime } from "luxon";
import { httpError } from "#error";
import { StatusCodes } from "#utils";

import type { onRequestAsyncHookHandler } from "fastify";

export const verifyUser: onRequestAsyncHookHandler = async function verifyUser(req) {
  const { auth, url, method } = req.routeOptions.config;
  if (!auth) {
    req.log.debug({ url, method }, "Skip verifyUser because `auth` is not configured");
    return;
  }
  if (!auth.isUser && !auth.isAdmin) {
    req.log.debug({ url, method }, "Skip verifyUser because `auth.isUser` is not configured");
    return;
  }
  const { userId } = req.session;
  if (!userId) {
    req.log.debug({ url, method }, "userId does not exist in session");
    throw httpError(StatusCodes.forbidden);
  }
  const user = await this.db.user.findUnique({ where: { id: userId } });
  if (!user) {
    req.log.debug({ url, method, userId }, "Cannot find user by id");
    throw httpError(StatusCodes.forbidden);
  }
  const newExpiredDateTime = DateTime.now().plus({ days: 1 });
  req.session.options({ expires: newExpiredDateTime.toJSDate() });
  req.session.expiredAt = newExpiredDateTime.toISO();
  if (auth.isAdmin && !user.isAdmin) {
    req.log.debug({ url, method, userId }, "User is not admin");
    throw httpError(StatusCodes.forbidden);
  }
  req.user = user;
};
