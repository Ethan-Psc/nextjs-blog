import { apiHandler } from "utils/server";
import { prisma, authMiddleware, linkCreatorGuard } from "utils/server";
export default apiHandler()
  .put(
    authMiddleware(),
    linkCreatorGuard((req) => req.query.linkId),
    async (req, res) => {
      console.log(req.query.linkId);
      const { url, title } = req.body;
      const linkId = req.query.linkId as string;
      await prisma.link.update({
        where: {
          id: linkId,
        },
        data: {
          url,
          title,
        },
      });
      res.json({
        msg: "success",
      });
    }
  )
  .delete(
    authMiddleware(),
    linkCreatorGuard((req) => req.query.linkId),
    async (req, res) => {
      const linkId = req.query.linkId as string;
      await prisma.link.delete({
        where: {
          id: linkId,
        },
      });
      res.json({ msg: "success" });
    }
  );
