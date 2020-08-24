module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ContentSchema = new Schema({
    code: { type: String },
    name: { type: String }
  });

  const DictionarySchema = new Schema({
    code: { type: String },
    name: { type: String },
    content: [ContentSchema]
  });

  return mongoose.model('Dictionary', DictionarySchema);
};
