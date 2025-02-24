export const ValidationFunctionProvider = {
  provide: 'VALIDATION_FUNCTION',
  useValue: (body: any): string | null => {
    if (!body.title) {
      return 'Title is required';
    }
    if (body.title.length < 3) {
      return 'Title must be at least 3 characters long';
    }
    return null;
  },
};
