module.exports = (app: any) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ContentSchema = new Schema({
    code: { type: String },
    name: { type: String },
  });

  const DictionarySchema = new Schema({
    code: { type: String },
    name: { type: String },
    desc: { type: String },
    content: [ ContentSchema ],
    creator_uid: { type: Number },
    creator_name: { type: String },
    created_at: { type: Number },
    last_modifier_uid: { type: Number },
    last_modifier_name: { type: String },
    modified_at: { type: Number },
  });

  return mongoose.model('Dictionary', DictionarySchema);
};
