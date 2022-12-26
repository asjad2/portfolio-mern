import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SignupStructure = mongoose.Schema({
  FullName: { type: String },
  UserName: {
    type: String,
    unique: true,
    required: [true, "please add your Username"],
  },
  Password: {
    type: String,
    required: [true, "please add your Password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "please add your Password"],
  },

  Email: {
    type: String,
    unique: true,
    required: [true, "please add your Email"],
  },
  PhoneNumber: {
    type: String,
  },
  tokens: [
    {
      token: { type: String,
         required: true }
    }
  ]
});

SignupStructure.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 12);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  }
  next();
});
SignupStructure.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.Secret_Key);
    this.tokens = this.tokens.concat({ token: token });
    
    await this.save();
    return token;
  } catch (error) {
    
  }
};

const SignupModel = mongoose.model("Sign Up Data", SignupStructure);

export default SignupModel;
