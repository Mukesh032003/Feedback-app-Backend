import mongoose, { Document, Schema, Types } from "mongoose";

interface IChangeLog extends Document {
  from: any;                  // old value
  to: any;                    // new value
  document: string;           // name of the collection/table changed
  documentId: Types.ObjectId; // which specific doc changed
  changedBy: Types.ObjectId;  // admin userId
}

const changeLogSchema: Schema = new Schema(
  {
    from: { type: Schema.Types.Mixed, required: true },
    to: { type: Schema.Types.Mixed, required: true },
    document: { type: String, required: true }, 
    documentId: { type: Schema.Types.ObjectId, required: true },
    changedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const ChangeLog = mongoose.model<IChangeLog>("ChangeLog", changeLogSchema);

export { ChangeLog };
export type { IChangeLog };
