import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  title: { type: String, required: true },
  description: { type: String }
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret._id;
    },
    virtuals: true,
  }
});

ticketSchema.index({ id: 1, user: 1 });

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
