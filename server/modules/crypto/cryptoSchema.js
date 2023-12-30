
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cryptoSchema = new schema({
  name: { type: String, required: true },
  image: [ {type: schema.Types.Mixed, required: false} ],

 
});


module.exports = Crypto = mongoose.model('crypto', cryptoSchema);
