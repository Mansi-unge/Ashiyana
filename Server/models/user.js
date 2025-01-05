import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },  // Add regex validation for email
  image: { type: String },
  password: { type: String, required: true },  // Add password field here
  bookedVisits: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Residency" },
      date: { type: Date, required: true },
    },
  ],
  favResidenciesID: { type: [Schema.Types.ObjectId], ref: 'Residency', default: [] },
  ownedResidencies: [{ type: Schema.Types.ObjectId, ref: 'Residency' }],
});

export default mongoose.model('User', UserSchema);
