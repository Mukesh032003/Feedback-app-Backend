import mongoose, { Document, Schema, Types } from 'mongoose';

interface IStudent extends Document {
    userId: Types.ObjectId;
    classId: Types.ObjectId;
}

const studentSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true, // One student per user
        },
        classId: {
            type: Schema.Types.ObjectId,
            ref: 'Class',
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'graduated', 'dropped', 'inactive'],
            default: 'active',
        },
    },
    { timestamps: true },
);

const Student = mongoose.model<IStudent>('Student', studentSchema);

export { Student };
export type { IStudent };
