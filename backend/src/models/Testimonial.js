import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true,
    },
    clientTitle: {
      type: String,
      required: [true, 'Please provide client title'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
    },
    content: {
      type: String,
      required: [true, 'Please provide testimonial content'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    image: {
      type: String,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    projectRelated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
