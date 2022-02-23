import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from './../../config/config';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  // hash password only if it has been modified
  if (!this.isModified('password')) return next();

  // Random additional data and hashing
  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hash = await bcrypt.hash(this.password, salt);

  // Replace the password with the hash
  this.password = hash;
  return next();
});

const user = mongoose.model('user', userSchema);
export default user;
