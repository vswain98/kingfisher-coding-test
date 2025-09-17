export function flattenObject(
  data: Record<string, any>,
  currentKey = ""
): Record<string, any> {
  let result: Record<string, any> = {};
  for (const key of Object.keys(data)) {
    const value = data[key];
    const updatedKey = currentKey ? `${currentKey}.${key}` : key;
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        Object.assign(result, flattenObject({ [index]: item }, updatedKey));
      });
    } else if (value !== null && typeof value === "object") {
      Object.assign(result, flattenObject(value, updatedKey));
    } else {
      result[updatedKey] = value;
    }
  }
  return result;
}
