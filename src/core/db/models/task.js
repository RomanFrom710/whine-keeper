import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

import {TASK_CONSUMER, TASK_STATUS} from '../../enums';

const taskSchema = new mongoose.Schema({
  consumer: {
    type: String,
    required: true,
    enum: Object.values(TASK_CONSUMER),
    index: true,
  },
  payload: {type: String, index: true},
  priority: {type: Number, default: 1},

  status: {
    type: String,
    enum: Object.values(TASK_STATUS),
    default: TASK_STATUS.open,
    index: true,
  },
  result: {type: String},
});

taskSchema.plugin(timestamps);

export default mongoose.model('task', taskSchema);
