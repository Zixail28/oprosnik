const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formdataSchema = new Schema({
  shopOnline: {
    type: Number,
    require: true,
  },
  internetBank: {
    type: Number,
    require: true,
  },
  ingameBuy: {
    type: Number,
    require: true,
  },
  useVPN: {
    type: Number,
    require: true,
  },
  victimScummers: {
    type: Number,
    require: true,
  },
  securityInInternet: {
    type: Number,
    require: true,
  },
  leakInfo: {
    type: Number,
    require: true,
  },
  whatIsDevice: {
    type: Number,
    require: true,
  },
}, { timestamps: true });

const Formdata = mongoose.model("Formdata", formdataSchema);

module.exports = Formdata;
