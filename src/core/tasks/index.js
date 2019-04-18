import {Task} from '../db';
import {TASK_STATUS} from '../enums';

export async function insertTask(consumer, payload, priority = 1) {
  const query = {consumer, payload};
  const update = {
    $set: {priority},
    $setOnInsert: {consumer, payload},
  };
  const options = {
    upsert: true,
    new: true,
  };

  const upsertedTask = await Task.findOneAndUpdate(query, update, options);
  return upsertedTask.id.toString();
}

export function takeTask(consumer) {
  const query = {consumer};
  const update = {status: TASK_STATUS.open};
  const options = {
    sort: {priority: -1, createdAt: 1},
    lean: true,
  };

  return Task.findOneAndUpdate(query, update, options);
}

export async function bumpPriority(taskId, step = 1) {
  const update = {$inc: {priority: step}};
  const updatedTask = await Task.findByIdAndUpdate(taskId, update);
  if (!updatedTask) {
    throw new Error(`Task with id ${taskId} was not found.`);
  }
}
