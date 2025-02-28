import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the residency schema
const residencySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, required: true }, // Store Base64 string
  facilities: { type: Schema.Types.Mixed },
  userEmail: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" }, // Owner reference
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});



// Ensure unique address and userEmail combination
residencySchema.index({ address: 1, userEmail: 1 }, { unique: true });

// Export the model if it doesn't exist yet
const Residency = mongoose.models.Residency || mongoose.model('Residency', residencySchema);

export default Residency;
