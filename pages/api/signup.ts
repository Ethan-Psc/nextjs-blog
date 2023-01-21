import { prisma, apiHandler } from "utils/server";
import bcrypt from "bcrypt";
export default apiHandler().post(async (req, res) => {
  const { username, password } = req.body;
 await prisma.user.create({
    data: {
      name: username,
      password: bcrypt.hashSync(password,10),
    },
  });
  res.json({
    msg: "success",
  });
});
