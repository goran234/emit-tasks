import { BaseInput } from '@/task-one/models/base-input'

export class SelectInput extends BaseInput {
  constructor(
    public id: string,
    public label: string,
    public type: string,
    public validations: { [key: string]: number | boolean | string },
    public inputValue: string = '',
    public showIf?: {[key: string]: string},
    public options?: { value: string; label: string }[]
  ) {
    super(id, label, type, validations, inputValue, showIf);
    this.options = options || []
  }
}
