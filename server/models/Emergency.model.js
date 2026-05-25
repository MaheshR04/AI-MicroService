import mongoose from 'mongoose';

const emergencyLocationSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    accuracy: Number,
    updatedAt: Date,
  },
  { _id: false },
);

const emergencyGuardianSchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: String,
    relationship: String,
  },
  { _id: false },
);

const emergencySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'RESOLVED', 'CANCELLED'],
      default: 'ACTIVE',
      index: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 240,
      default: 'SOS emergency activated',
    },
    location: {
      type: emergencyLocationSchema,
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'UNKNOWN'],
      default: 'UNKNOWN',
    },
    riskScore: {
      type: Number,
      default: 0,
    },
    guardianContacts: {
      type: [emergencyGuardianSchema],
      default: [],
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Emergency = mongoose.model('Emergency', emergencySchema);

export default Emergency;
