export const inputValidate = (value: string): boolean => {
    if (value.trim().length > 0) {
      return true;
    }
    return false;
};