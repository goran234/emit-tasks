<template>
  <div class="form-wrapper">
    <component v-for="item in formBuilder.schema.fields"
               :formBuilder="formBuilder"
               :inputData="item"
               :key="item.id"
               :is="typeComponent[item.type]"
                @inputModelCreated="addToFormBuilder"
    >
    </component>
  </div>
</template>

<script setup lang="ts">
import TextComponent from './form-inputs/TextComponent.vue';
import formSchema from '../form-schema.json'
import NumberComponent from '@/task-one/components/form-inputs/NumberComponent.vue'
import SelectComponent from '@/task-one/components/form-inputs/SelectComponent.vue'
import CheckboxComponent from '@/task-one/components/form-inputs/CheckboxComponent.vue'
import { FormBuilder } from '@/task-one/models/form-builder'
import type { BaseInput } from '@/task-one/models/base-input'
import { reactive } from 'vue'

  const typeComponent = {
    text: TextComponent,
    number: NumberComponent,
    select: SelectComponent,
    checkbox: CheckboxComponent
  }

  const formBuilder = reactive( new FormBuilder(formSchema));

  function addToFormBuilder(inputModel: BaseInput) {
    formBuilder.addInput(reactive(inputModel))
  }

</script>

<style scoped>
  .form-wrapper {
    width: 600px;
  }
</style>
