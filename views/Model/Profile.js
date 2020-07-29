//// Create Schema by using mongoose
// install mongoose => load mongoose module => init that module/schema => export
// install is npm install mongoose or yarn add
const mongoose = require("mongoose");  //load
const Schema = mongoose.Schema;    //init

/// new Schema instance should create and that should be an Object
const ProfileSchema = new Schema({
  // blueprint of database
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
    date: {
        type: Date,
        default:Date.now,
  },
});