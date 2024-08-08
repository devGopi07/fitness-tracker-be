const validator = require("validator");
const mongoose = require("mongoose");
let DatasSchema = new mongoose.Schema(
  { 
    email: { type: String, required: true },
    date: { type: String, required: true },
    exercise: { type: String, required: true },
    count:{ type: Number, required: true },  
    createdAt: { type: Date, default: Date.now() },
  },
  {
    collection: "datas",
    versionKey: false,
  }
);

let DatasModel = mongoose.model("datas", DatasSchema);

module.exports = { DatasModel };
