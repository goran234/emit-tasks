import { validationHash } from '@/task-one/helpers/validations'

export class BaseInput {
  public validationFunctions: { [key: string]: (input: unknown) => boolean }[] = [];

  constructor(
    public id: string,
    public label: string,
    public type: string,
    public validations: { [key: string]: number | boolean | string },
    public inputValue: string = '',
    public showIf?: {[key: string]: string},
  ) {
    this.id = id;
    this.label = label;
    this.type = type;
    this.setValidation(validations || {})
    this.showIf = showIf;
    this.inputValue = inputValue;

  }

  isValid() {
    if (!this.validations?.required && !this.inputValue) return true;
    // @ts-expect-error: description
    return this.validationFunctions.every((validation: unknown) => validation(this.inputValue));
  }

  setValidation(validations:  { [key: string]: number | boolean | string }) {

    this.validationFunctions = Object.entries(validations).map( ([key, value]) => {
      return validationHash[key](value);
    })
  }
}
