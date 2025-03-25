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
  body: { // or html, depending on how you parse the email
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
  attachments: [{ // Array for handling attachments
    filename: String,
    contentType: String,
    data: Buffer, // Store attachment data as buffer
  }],
  messageId: {
    type: String, // Store the message ID from the email server
    unique: true, // Optional: ensure uniqueness
  },
  userId: { // Store the user ID associated with the email
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const IncomingEmail = mongoose.model('IncomingEmail', incomingEmailSchema);

export default IncomingEmail;