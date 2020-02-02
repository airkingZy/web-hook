import { Document } from 'mongoose';

export interface WebHook extends Document {
  readonly localdir: string;
  readonly githubrepositorie: string;
  readonly bashfile: string;
  readonly log: string;
  readonly status: string;
}
