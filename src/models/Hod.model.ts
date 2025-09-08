import mongoose, { Document, Schema, Types } from 'mongoose';

interface IHod extends Document {
    userId: Types.ObjectId;
    departmentId: Types.ObjectId;
}

const hodSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true, // 1 HOD per user
        },
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
    },
    { timestamps: true },
);

const Hod = mongoose.model<IHod>('Hod', hodSchema);

export { Hod };
export type { IHod };
