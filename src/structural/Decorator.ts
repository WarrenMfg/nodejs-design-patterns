/**
 * Attach additional responsibilities to an object dynamically.
 * Provide a flexible alternative to sub classing for extending functionality.
 * Also known as the wrapper pattern.
 */

import axios from 'axios';

/**
 * Functional
 */
export const getTodo = async (number: number) =>
  axios(`https://jsonplaceholder.typicode.com/todos/${number}`);

export const decoratedGetTodo = (func: typeof getTodo) => {
  return async (number: number) => {
    const { data } = await func(number);

    return {
      id: data.id,
      user: {
        id: data.userId,
      },
      title: data.title
        .split(' ')
        .map((word: string) => word[0].toUpperCase() + word.slice(1))
        .join(' '),
      isComplete: data.completed,
    };
  };
};

/**
 * Class
 */
const formattedTodo = (
  target: Todos,
  key: keyof Todos,
  descriptor: PropertyDescriptor
) => {
  const func = target[key];
  descriptor.value = decoratedGetTodo(func);
};

export class Todos {
  @formattedTodo
  get(number: number) {
    return axios(`https://jsonplaceholder.typicode.com/todos/${number}`);
  }
}
