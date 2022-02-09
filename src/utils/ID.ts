export function generateClosuredId(): Function {
  let id = 0;
  return function getNextId() {
    return ++id;
  };
}
