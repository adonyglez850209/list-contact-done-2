import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "@/app/api/uploadthing/core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: process.env.NEXTAUTH_URL,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
  },
});