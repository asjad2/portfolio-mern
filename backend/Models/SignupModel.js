import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
});


SignupStructure.pre('save',async function (next) {
  if (this.isModified('Password')) {
    this.Password = await bcrypt.hash(this.Password, 12);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  }
  next();
});

const SignupModel = mongoose.model("Sign Up Data", SignupStructure);

export default SignupModel;