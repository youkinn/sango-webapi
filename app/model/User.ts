module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String },
  });

  return mongoose.model('User', UserSchema);
};
