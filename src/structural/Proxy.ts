/**
 * Provide a surrogate, or placeholder, for another object to control access to, alter, or augment it
 */
const obj = {
  computer: 'Mac',
  model: 'MacBook Pro',
  year: 2019,
  size: 16,
};

const makeReactive = (
  obj: Record<string, unknown>,
  observer: typeof console.log
) =>
  new Proxy(obj, {
    set(target, key, value) {
      observer({ prev: { [key]: obj[key as string] }, cur: { [key]: value } });
      target[key as string] = value;
      return true;
    },
  });

const reactive = makeReactive(obj, console.log);

export default reactive;
