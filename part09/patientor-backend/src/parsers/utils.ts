export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isNumber = (x: unknown): x is number => {
  return typeof x === "number" || x instanceof Number;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error("Incorrect or missing id");
  }
  return id;
};

export const parseString = (s: unknown, fieldName: string): string => {
  if (!s || !isString(s)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }
  return s;
};

export const parseDate = (date: unknown, fieldName: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }
  return date;
};
