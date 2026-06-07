import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['residential', 'commercial', 'institutional', 'other'],
    },
    location: {
      type: String,
      required: [true, 'Please provide project location'],
    },
    completionDate: {
      type: Date,
      required: [true, 'Please provide completion date'],
    },
    budget: {
      type: Number,
      required: [true, 'Please provide budget'],
    },
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
