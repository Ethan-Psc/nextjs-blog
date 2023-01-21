import { apiHandler, authMiddleware, prisma } from "utils/server";
export default apiHandler()
  .get(authMiddleware(), async (req, res) => {
    const links = await prisma.link.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({
      data: links,
    });
  })
  .post(authMiddleware(), async (req, res) => {
    const { url, title } = req.body;
    console.log(url, title);
    await prisma.link.create({
      data: {
        url,
        title,
        creatorName: (req as any).user.name,
      },
    });
    res.json({
      msg: "success",
    });
  });
