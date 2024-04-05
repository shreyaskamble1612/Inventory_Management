const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = async (req, res, next) => {
  const token = req.header("authtoken");
  console.log(JWT_SECRET);

  if (!token) {
    res
      .status(401)
      .send({ errors: "Please try using valid token", success: false });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please try using valid token" });
  }
};

module.exports = fetchuser;
