import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true,
    },
    clientEmail: {
      type: String,
      required: [true, 'Please provide client email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    clientPhone: {
      type: String,
      required: [true, 'Please provide client phone'],
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Please provide appointment date'],
    },
    appointmentTime: {
      type: String,
      required: [true, 'Please provide appointment time'],
    },
    duration: {
      type: Number,
      default: 60,
    },
    subject: {
      type: String,
      required: [true, 'Please provide appointment subject'],
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    appointmentType: {
      type: String,
      enum: ['consultation', 'project-review', 'proposal', 'other'],
      default: 'consultation',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
