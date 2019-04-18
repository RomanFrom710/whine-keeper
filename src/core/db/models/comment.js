import {mongoose} from 'mongoose';
import timestamps from 'mongoose-timestamp';

const snapshotSchema = new mongoose.Schema({
  content: {type: String},
  dislikes: {type: Number},
  likes: {type: Number},
});

const commentSchema = new mongoose.Schema({
  authorId: {type: Number, required: true, index: true},
  authorName: {type: String, required: true},
  content: {type: String, required: true},
  postedAt: {type: Date, required: true},

  dislikes: {type: Number, required: true, index: true},
  likes: {type: Number, required: true, index: true},

  isRemoved: {type: Boolean},
  history: {type: [snapshotSchema], default: []},

  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
    index: true,
  },
});

commentSchema.plugin(timestamps);
snapshotSchema.plugin(timestamps);

export {commentSchema};
export default mongoose.model('apartment', commentSchema);
