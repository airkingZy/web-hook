import * as mongoose from 'mongoose';
export const WebHookSchema = new mongoose.Schema(
  {
    localdir: { type: String, unique: true },
    githubrepositorie: { type: String, unique: true },
    bashfile: { type: String, unique: true },
    status: { type: String, default: 'success' },
    log: { type: String },
  },
  { collection: 'webhook', versionKey: false },
);
