<template>
  <div class="input-wrapper" v-show="isShown">
    <label :for="inputModel.id">{{ inputModel.label }}: </label>
    <input v-model="inputModel.inputValue" :id="inputModel.id" type="checkbox" />
    <div v-if="!isValid" class="error">Not Valid</div>
  </div>
</template>

<script lang="ts" setup>
import { BaseInput } from '@/task-one/models/base-input'
import { computed, reactive } from 'vue'
import { TextInput } from '@/task-one/models/text-input'
import { FormBuilder } from '@/task-one/models/form-builder'
import { CheckboxInput } from '@/task-one/models/checkbox-input'
import { useIsValidComposable } from '@/task-one/components/form-inputs/composable/is-valid'

const props = defineProps({
  inputData: BaseInput,
  formBuilder: FormBuilder
})

const inputModel = reactive(
  new CheckboxInput(
    props.inputData!.id,
    props.inputData!.label,
    props.inputData!.type,
    props.inputData!.validation,
    props.inputData!.inputValue,
    props.inputData!.showIf,
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
  align-items: center;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
  margin-right: 8px;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

input[type="checkbox"]:focus {
  outline: 2px solid #3498db;
  border-radius: 3px;
}

.error {
  margin-left: 12px;
  font-size: 12px;
  color: #e74c3c;
  font-weight: bold;
}

</style>
