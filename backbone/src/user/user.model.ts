import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../../config/config';

export interface UserDocument {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true }
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

userSchema.methods.comparePassword = async function (userPassword: string) {
  return bcrypt.compare(userPassword, this.password).catch((e) => false);
};

const user = mongoose.model<UserDocument>('user', userSchema);
export default user;
