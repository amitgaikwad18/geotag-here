const mongoose = require('mongoose');

const plotSchema = mongoose.Schema({
  plotName: {type: String, required: true},
});

module.exports = mongoose.model('Plot', plotSchema);
