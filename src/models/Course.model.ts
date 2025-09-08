import mongoose, { Document, Schema, Types } from 'mongoose';

interface ICourse extends Document {
    departmentId: Types.ObjectId;
    name: string;
}

const courseSchema: Schema = new Schema(
    {
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    { timestamps: true },
);

const Course = mongoose.model<ICourse>('Course', courseSchema);

export { Course };
export type { ICourse };
