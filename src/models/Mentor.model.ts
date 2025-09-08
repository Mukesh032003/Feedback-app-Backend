import mongoose, { Document, Schema, Types } from 'mongoose';

interface IMentor extends Document {
    userId: Types.ObjectId;
    classId: Types.ObjectId;
}

const mentorSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true, // One mentor per user
        },
        classId: {
            type: Schema.Types.ObjectId,
            ref: 'Class',
            required: true,
        },
    },
    { timestamps: true },
);

const Mentor = mongoose.model<IMentor>('Mentor', mentorSchema);

export { Mentor };
export type { IMentor };
