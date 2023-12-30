const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  //General
  name: {type:String},
  email: { type: String },
  password: { type: String },
  cryptoList: [
    {
      crypto: { type: schema.Types.ObjectId, ref: 'crypto' },
      point: {type:Number}
    },
  ],
  total_points: {type: Number}
 
});


module.exports = User = mongoose.model('user', userSchema);
