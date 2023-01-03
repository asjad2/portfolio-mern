import ContactusModel from "../Models/ContactusModel.js";
import SignupModel from "../Models/SignupModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postMessages = async (req, res) => {
  const { FullName, Email, Message } = req.body;
  const newMessage = new ContactusModel({
    FullName,
    Email,
    Message,
  });
  try {
    await newMessage.save();
    res.status(200).json(newMessage);
    console.log("Message Saved");
  } catch (error) {
    res.status(505).json("Server Error");
    console.log("Message Not saved...");
  }
};

export const postMembers = async (req, res) => {
  const { FullName, UserName, Email, Password, confirmPassword, PhoneNumber } =
    req.body;
  try {
    const existingUser = await SignupModel.findOne(
      { UserName: UserName } || { Email: Email }
    );
    if (existingUser) {
      res.status(404).json("User already exist");
    }
  } catch (err) {
    console.log("errors");
    res.status(505).json("Server Error");
  }

  const newMember = new SignupModel({
    FullName,
    UserName,
    Email,
    Password,
    confirmPassword,
    PhoneNumber,
  });
  try {
    await newMember.save();
    res.status(200).json(newMember);
    console.log("Member Saved");
  } catch (error) {
    res.status(505).json("Server Error");
    console.log("Member Not saved...");
  }
};

export const getMessages = async (req, res) => {
  try {
    const getMessage = await ContactusModel.find();
    res.status(200).json(getMessage);
  } catch (error) {
    res.status(505).json("Server Error");
    console.log("Not found any data.");
  }
};

export const deleteMessages = async (req, res) => {
  const newid = req.params.id;
  try {
    await ContactusModel.findByIdAndRemove(newid);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(505).json("Server Error");
    console.log("Error during deleting .... ");
  }
};

export const Login = async (req, res) => {
  try {
    const { User, Password } = req.body;
    console.log(req.body)
    if (!User || !Password) {
      res.status(404).json("Invalid Credntials");
    } else {
      let userlogin = await SignupModel.findOne(
        { UserName: User } || { Email: User }
      );
      console.log(userlogin.FullName)

      if (userlogin) {
        const isMatch = await bcrypt.compare(Password, userlogin.Password);

        if (isMatch) {
          let token = await userlogin.generateAuthToken();
          res.cookie("token", token, {
            expires: new Date(Date.now() + 40000),
            httpOnly: true,
          });
          console.log("loged in successfully");
          res.send("200");
        } else {
          console.log("Invalid credentials");

          res.send("404");
        }
      }
    }
  } catch (error) {
    res.status(505).json("Server Error");
  }
};

export const verifiedToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(404).json({ message: "No Token Found" });
  }
  jwt.verify(String(token), process.env.Secret_Key, (err, user) => {
    req.id = user._id;
  });
  next();
};

export const getMembers = async (req, res) => {
  let id = req.id;
 
  let Member;
  try {
    Member = await SignupModel.findById(id);
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json(Member);
};

// export const getApplicationById = async (req, res) => {
//   try {
//     const user = await hostelApplicationModel.findById(req.params.id);
//     res.json(user);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const updateApplication = async (req, res) => {
//   const user = req.body;
//     const edituser = new hostelApplicationModel(user);
//     try {
//         await hostelApplicationModel.updateOne({ _id : req.params.id }, edituser);
//         res.status(200).send(edituser);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };
