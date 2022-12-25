import mongoose from "mongoose";

const ContactusStructure = mongoose.Schema({
  FullName: { type: String, required: [true, "please add your email"] },
  
  Email: {
    type: String,

    required: [true, "please add your email"],
  },
  Message:{
    type:String,
    required:[true,"Enter Your Meesage"]
  }
});

const ContactusModel = mongoose.model(
  "Contactus",
  ContactusStructure
);

export default ContactusModel;
