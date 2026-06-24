import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude /studio (the embedded Sanity Studio) from locale routing.
  matcher: ["/((?!api|_next|_vercel|studio|.*\\..*).*)"],
};
