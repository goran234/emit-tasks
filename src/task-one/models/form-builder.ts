import type { BaseInput } from '@/task-one/models/base-input'

export class FormBuilder {
  public schema: unknown;
  public formInputs: {[key: string]: BaseInput} = {};

  constructor(schema: unknown) {
    this.schema = schema;
  }

  addInput(input: BaseInput) {
    this.formInputs[input.id] = input;
  }

  isValid() {
    return Object.values(this.formInputs).every(input => input.isValid());
  }
}
