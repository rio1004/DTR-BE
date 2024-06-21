const exprs = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { generateJWT } = require("../../middleware/auth");
const router = exprs.Router();

router.post("/register", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    console.log(req.body);
    const newUser = await new User({
      username,
      password: hashedPass,
      firstName,
      lastName,
    });
    newUser.save();
    res.status(201).json({
      message: "Registered kana, Pakyu ka pa",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ginagawa mo? Failed ung Registration mo!",
      error,
      status: 500,
    });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Di kapa Register, Excited kaba?", status: 404 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Mali password mo, parang di ka nag grade 2",
        status: 401,
      });
    }
    let token = user.token;

    if (!token) {
      token = await generateJWT(user);
      await User.updateOne(
        { _id: user._id, token: { $exists: false } },
        { $set: { token } },
        { upsert: true }
      );
    } else {
      token = await generateJWT(user);
      await User.updateOne(
        { _id: user._id },
        { $set: { token } }
      );
    }
    
    res.status(200).json({
      token: token,
      id: user._id,
      data: {
        fullName: user.firstName + " " + user.lastName,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Wait lang nag Failed, try mo uli!", status: 500 });
  }
});

module.exports = router;
