import mongoose, { Document, Schema } from 'mongoose';

interface IDepartment extends Document {
    name: string;
}

const departmentSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    { timestamps: true },
);

const Department = mongoose.model<IDepartment>('Department', departmentSchema);

export { Department };
export type { IDepartment };
