
const mongoose = require('mongoose');
// const counterSch = require('../../helper/counterSchema');
const schema = mongoose.Schema;

const cryptoSchema = new schema({
  //General
  // crypto_id: { type: Number, required: false },
  name: { type: String, required: true },
  image: [ {type: schema.Types.Mixed, required: false} ],

 
});


module.exports = Crypto = mongoose.model('crypto', cryptoSchema);
