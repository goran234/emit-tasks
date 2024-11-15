<template>
  <div class="task-card">
    <div class="task-header">
      <div class="task-title">Title: {{props.task.title}}</div>

      <div class="task-info">
        <div> Priority: {{props.task.priority}} </div>
        <button :class="{completed: props.task!.completed}" @click="toggleCompleted()"> {{ completedStatus }} </button>
        <button @click="deleteTask()"> Delete </button>
      </div>
    </div>

    <div class="task-content">
      <div class="task-desc">{{props.task.description}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Task } from '@/task-two/models/task'
  import { computed, useAttrs } from 'vue'

 const props =  defineProps({
    task: Task,
  })

  const emit = defineEmits<{
    (e: 'delete', id: number): void
    (e: 'toggleStatus', id: number): void
  }>()

  const attrs = useAttrs();

  function deleteTask(): void {
    console.log(attrs.idx);
    emit('delete', attrs.idx);
  }

  function toggleCompleted(): void {
    emit('toggleStatus', props.task!.id);
  }

  const completedStatus = computed(() => props.task!.completed ?  'Completed' : 'Incomplete');
</script>

<style scoped>
.completed {
  background-color: green;
}

.task-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 16px;
  padding: 16px;
  max-width: 400px;
  font-family: Arial, sans-serif;
  color: #333333;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.task-title {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.task-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.task-info div {
  font-size: 14px;
  margin-bottom: 4px;
  cursor: pointer;
}

.task-info div:hover {
  text-decoration: underline;
}

button {
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c0392b;
}

.task-content {
  border-top: 1px solid #e0e0e0;
  padding-top: 12px;
}

.task-desc {
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.5;
}

</style>/
