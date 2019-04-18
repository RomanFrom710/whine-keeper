import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

import {ONLINER_CATEGORY} from '../../enums';

const snapshotSchema = new mongoose.Schema({
  views: {type: Number, required: true},
});

const articleSchema = new mongoose.Schema({
  author: {type: String, required: true},
  category: {type: String, enum: Object.values(ONLINER_CATEGORY), required: true},
  onlinerId: {type: Number, required: true},
  postedAt: {type: Date, required: true},
  tags: {type: [String], default: []},
  title: {type: String, required: true},
  url: {type: String, required: true},
  views: {type: Number, required: true, index: true},

  history: {type: [snapshotSchema], default: []},
});

articleSchema.plugin(timestamps);
snapshotSchema.plugin(timestamps);

export {articleSchema};
export default mongoose.model('article', articleSchema);
