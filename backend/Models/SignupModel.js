import mongoose from "mongoose";

const SignupStructure = mongoose.Schema({
  FullName: { type: String,
  
  },
  UserName: {
    type: String,
    unique: true,
    required: [true, "please add your Username"],
  },
  Password: {
    type: String,
    unique: true,
    required: [true, "please add your Password"],
  },

  Email: {
    type: String,
    unique: true,
    required: [true, "please add your Email"],
  },
  PhoneNumber: {
    type: String,
  }
});

const SignupModel = mongoose.model("Sign Up Data", SignupStructure);

export default SignupModel;
