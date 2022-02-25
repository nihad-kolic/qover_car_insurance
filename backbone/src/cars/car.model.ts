import mongoose from 'mongoose';

export interface CarDocument {
    manufacturer: string;
    ageLimit: number;
    highRisk: boolean;
    globalPrice: number;
    universalPercentage: number;
    createdAt: Date;
    updatedAt: Date;
}

const carSchema = new mongoose.Schema({
  manufacturer: { type: String, required: true, unique: true, trim: true },
  ageLimit: { type: Number, required: true, default: 18 },
  highRisk: { type: Boolean, required: true, defailt: false },
  globalPrice: { type: Number, required: true },
  universalPercentage: { type: Number, required: true }
}, { timestamps: true });

const car = mongoose.model<CarDocument>('car', carSchema);
export default car;
