<template>
  <div class="input-wrapper" v-show="isShown">
    <label :for="inputModel.id">{{ inputModel.label }}: </label>
    <select v-model="inputModel.inputValue" :id="inputModel.id" type="number">
      <option :key="option.value" v-for="option in inputModel.options" :value="option.value"> {{option.label}}</option>
    </select>
    <div v-if="!isValid" class="error">Not Valid</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { TextInput } from '@/task-one/models/text-input'
import { FormBuilder } from '@/task-one/models/form-builder'
import { SelectInput } from '@/task-one/models/select-input'
import { useIsValidComposable } from '@/task-one/components/form-inputs/composable/is-valid'

const props = defineProps({
  inputData: SelectInput,
  formBuilder: FormBuilder
})

const inputModel = reactive(
  new SelectInput(
    props.inputData!.id,
    props.inputData!.label,
    props.inputData!.type,
    props.inputData!.validation,
    props.inputData!.inputValue,
    props.inputData!.showIf,
    props.inputData!.options
  )
)

const emits = defineEmits<{ (e: 'inputModelCreated', inputModel: TextInput): void }>()

emits('inputModelCreated', inputModel);

const isShown =  computed(() => {
  if (inputModel.showIf?.field) {
    return props.formBuilder?.formInputs[inputModel.showIf?.field].inputValue
  } else {
    return true
  }
})

const { isValid } = useIsValidComposable(inputModel)
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
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
  box-sizing: border-box;
  background-color: #ffffff;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.error {
  margin-top: 6px;
  font-size: 12px;
  color: #e74c3c;
  font-weight: bold;
}
</style>
