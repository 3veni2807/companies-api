const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String },
  location: { type: String },
  employees: { type: Number, default: 0 },
  website: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
