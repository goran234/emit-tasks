export const min = (min: number) => {
  return (value: string) => {
    return parseInt(value) >= min
  }
}

export const max = (max: number) => {
  return (value: string) => {
    return parseInt(value) <= max
  }
}

export const minLength = (min: number) => {
  return (value: string) => {
    return value.length >= min
  }
}

export const maxLength = (max: number) => {
  return (value: string) => {
    return value.length <= max
  }
}

export const required = () => {
  return (value: string | number | boolean | undefined): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0
    }
    if (typeof value === 'number') {
      return !isNaN(value)
    }
    if (typeof value === 'boolean') {
      return true
    }
    return false
  }
}

export const validationHash = {
  min: min,
  max: max,
  minLength: minLength,
  maxLength: maxLength,
  required: required,
}
