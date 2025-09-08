import mongoose, { Document, Schema, Types } from 'mongoose';

interface IClass extends Document {
    courseId: Types.ObjectId;
    semester: number;
    section?: string;
}

const classSchema: Schema = new Schema(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        semester: {
            type: Number,
            required: true,
        },
        section: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

const Class = mongoose.model<IClass>('Class', classSchema);

export { Class };
export type { IClass };
