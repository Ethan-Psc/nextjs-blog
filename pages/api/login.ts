import { prisma, apiHandler } from "utils/server";
import bcrypt from "bcrypt";
import * as Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import cookie from "cookie";
export default apiHandler().post(async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });
  const token = jwt.sign(
    {
      username: user?.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3 days" }
  );
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
    })
  );
  if (!user) throw Boom.unauthorized("user not found");
  if (bcrypt.compareSync(password, user.password)) {
    res.json({
      msg: "login success",
    });
  } else {
    throw Boom.unauthorized("username or password not correct");
  }
});
