import ContactusModel from "../Models/ContactusModel.js";
import SignupModel from "../Models/SignupModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = "SECURITYKEY";

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

  const { FullName, UserName, Email, Password, confirmPassword, PhoneNumber } = req.body;
    try {
     const existingUser = await SignupModel.findOne({ UserName: UserName } || {Email:Email});
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


export const Login= async (req, res) => {
  try {
    const { User, Password } = req.body;
    console.log(req.body)
    if (!User || !Password){
      res.status(404).json("Invalid Credntials")
    }
    else{
    const userlogin = await SignupModel.findOne({ Username: User } || {Email:User});
    if (userlogin) {
      const isMatch = await bcrypt.compare(Password, userlogin.Password);
      if (isMatch) {
        console.log("loged in successfully");
        res.send("200");
        //return res.status(200).json({message:"login successfully"})
      } else {
        console.log("Invalid credentials");
        
        // return res.status(404).json({error:"Invalid credentials pass"});
        res.send("404");
      }
    }
  }
      // const token= await userlogin.generateAuthToken();

      // try {
      //   var token = jwt.sign({ _id: userlogin._id }, JWT_SECRET_KEY, {
      //     expiresIn: "35s",
      //   });
      // } catch (error) {
      //   console.log("token not generated");
      //   console.log(error);
      // }
      // console.log(token);
      // // res.cookie("jwToken",token)
      // res.cookie("jwToken", token, {
      //   path: "/",
      //   expires: new Date(Date.now() + 1000 * 30),
      //   httpOnly: true,
      //   sameSite: "lax",
      // });
  } catch (error) {
    res.status(505).json("Server Error");
  
  }
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


// export const verifiedToken = (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const token = cookies.split("=")[1];
//   console.log(token);
//   if (!token) {
//     res.status(404).json({ message: "No Token Found" });
//   }
//   jwt.verify(String(token), jwt_secretKey, (err, user) => {
//     if (err) {
//       return res.status(400).json({ message: "Invalid Token" });
//     }
//     console.log(user.id);
//     req.id = user.id;
//   });
//   next();
// };
