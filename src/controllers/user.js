import User from "../models/users.js";
import { genSalt, hash, compare } from "bcrypt";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET_KEY || "kjhkjfbjhfbjhbajb"

// user Registration controller
export const newUserRegistration = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    return res.send({ status: "failed", message: "Email already exists" });
  }
  if (name && email && password) {
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    const doc = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await doc.save();
    return res.status(200).send({ status: "Success", message: "Successfully Register" });

  } else {
    return next(new ErrorHandler("All fielsds are required", 500));
  }
});




// user Login controller
export const userLogin = TryCatch(async (req, res, next) => {

  const { email, password } = req.body;

  if (email && password) {
    const user = await User.findOne({ email: email })
    if (user != null) {
      const isMatch = await compare(password, user.password)
      if ((user.email === email) && isMatch) {

        //Generate Token
        const token = jwt.sign({ userID: user._id },
          key, { expiresIn: "1d" })

        // 
        res.cookie("token", token, {
          sameSite: 'None',
          secure: true,
        })
        return res.send({ "status": "success", "message": "Login Success" })
      } else {
        return next(new ErrorHandler("Email or password is wrong", 500))
      }
    } else {
      return next(new ErrorHandler("You are not a Registered user", 500))
    }
  } else {
    return next(new ErrorHandler("All Fields are required", 500))
  }
})

export const Authentication = TryCatch(async (req, res, next) => {
  const userInfo = req.user
  if (userInfo) {
    res.status(200).send({ "authorized": true, info: userInfo })
  } else {
    return next(new ErrorHandler("Unauthorised user", 500))
  }
})
