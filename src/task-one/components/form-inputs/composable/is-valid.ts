import { computed } from 'vue';
import type { BaseInput } from '@/task-one/models/base-input'

export function useIsValidComposable(inputModel: BaseInput) {
  const isValid = computed(() => {
    return inputModel.isValid();
  });

  return {
    isValid
  };
}
