import mongoose from "mongoose";

const incomingEmailSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  body: { 
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  attachments: [{ 
    filename: String,
    contentType: String,
    data: Buffer, 
  }],
  messageId: {
    type: String,
    unique: true, 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
}, {
  timestamps: true,
});

const IncomingEmail = mongoose.model('IncomingEmail', incomingEmailSchema);

export default IncomingEmail;