const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Number = new Schema({
  id: {
    type: String
  },

  value: {
    type: String
  }
});

module.exports = mongoose.model('Number', Number);

