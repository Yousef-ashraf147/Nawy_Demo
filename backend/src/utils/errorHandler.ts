export const handleError = (err: unknown) => {
  if (err instanceof Error) return err.message;
  return "Unknown error occurred";
};
