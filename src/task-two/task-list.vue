<template>
  <TaskForm @addTask="addTask"></TaskForm>
  <div class="task-list">
    <div class="task-list-header">
      <div>Filter</div>
      <div class="task-filter">
        <div>

          <label>Priority</label>
          <select v-model="priority" name="filter-priority" id="filter-priority">
            <option value="">All</option>
            <option :value="Priority.LOW">Low</option>
            <option :value="Priority.MEDIUM">Medium</option>
            <option :value="Priority.HIGH">High</option>
          </select>
        </div>

        <div>
          <label>Completed</label>
          <select v-model="completed" name="filter-completed" id="filter-completed">
            <option value="">All</option>
            <option :value="true">Completed</option>
            <option :value="false">False</option>
          </select>
        </div>
      </div>
    </div>

    <div class="task-list-body">
      <div class="task-list-body-header">
        <div class="sort">
          <div @click="sortName">Name</div>
          <div @click="sortDate">Date</div>
        </div>
      </div>

      <div class="task-list-body-content">
        <TaskCard
          v-for="(task, idx) of filtered"
          :idx="idx"
          :key="task.id"
          :task="task"
          @delete="deleteTask"
          @toggleStatus="toggleStatus($event)"
        />
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type Ref, ref } from 'vue'
import type { Task } from '@/task-two/models/task'
import TaskCard from '@/task-two/task-card.vue'
import TaskForm from '@/task-two/task-form.vue'
import { Priority } from '@/task-two/models/priority.enum'
import { StoreService } from '@/task-two/services/store.service'

const tasks: Ref<Task[]> = ref(StoreService.retrieveTasks())
const priority = ref('');
const completed: Ref<string | boolean> = ref('');

function addTask(task: Task): void {
  tasks.value.push(task);
  StoreService.persistTasks(tasks.value);
}

function deleteTask(idx: number): void {
  console.log(idx)
  tasks.value.splice(idx, 1)
  StoreService.persistTasks(tasks.value);
}

function sortName(): void {
  tasks.value.sort((a, b) => a.title.localeCompare(b.title))
}

function sortDate(): void {
  tasks.value.sort((a, b) => a.id - b.id)
}


const filtered = computed(() => {
  return tasks.value.filter((task: Task) => {
    const filterByPriority = priority.value ? (t: Task) => t.priority == priority.value : () => true;
    const filterByCompleted = typeof completed.value  == 'boolean' ? (t: Task) => t.completed == completed.value : () => true;
    return filterByPriority(task) && filterByCompleted(task);
  })
})

function toggleStatus(id: number): void {
  const target = tasks.value.find(task => task.id == id);
  if (target) {
    target.completed = !target.completed;
    StoreService.persistTasks(tasks.value);
  }
}
</script>

<style scoped>
.task-list {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333333;
}

.task-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.task-filter {
  display: flex;
  gap: 20px;
}

.task-filter div {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 6px;
}

select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  width: 100%;
}

select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.task-list-body {
  border-top: 1px solid #e0e0e0;
  padding-top: 16px;
}

.task-list-body-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.sort {
  display: flex;
  gap: 20px;
}

.sort div {
  cursor: pointer;
  font-size: 14px;
  color: #3498db;
  transition: color 0.3s ease;
}

.sort div:hover {
  color: #2c3e50;
}

.task-list-body-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-list-body-content > * {
  width: 100%;
}

</style>
