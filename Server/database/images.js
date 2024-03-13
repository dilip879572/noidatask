const mongoose =require('mongoose');
const userSchema = mongoose.Schema({
    title: {
      type: String
    },
    description: {
     type:String
    },
    image: {
      type:String
     },
     link:
     {
      type:String
     }

  });
  
  module.exports = mongoose.model('faculty', userSchema);