<template>
  <div class="task-form">
    <div>
      <label>Title</label>
      <input v-model="task.title" name="title" id="title" type="text" />
    </div>

    <div>
      <label>Description</label>
      <input v-model="task.description" name="description" id="description" type="text" />
    </div>

    <div>
      <label>Priority</label>
      <select v-model="task.priority" name="priority" id="priority">
        <option :value="priority.LOW">Low</option>
        <option :value="priority.MEDIUM">Medium</option>
        <option :value="priority.HIGH">High</option>
      </select>
    </div>

    <div>
      <button @click="addTask">Add task</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Priority } from '@/task-two/models/priority.enum'
import { Task } from '@/task-two/models/task'
import { reactive } from 'vue'

const priority = Priority
let task = reactive(new Task())

const emit = defineEmits<{ (e: 'addTask', task: Task): void }>()

function addTask() {
  emit('addTask',  task )
  task = reactive(new Task());


}
</script>

<style scoped>
.task-form {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.task-form div {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 6px;
}

input[type="text"],
select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"]:focus,
select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

button {
  background-color: #2ecc71;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #27ae60;
}

button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(39, 174, 96, 0.5);
}

</style>

