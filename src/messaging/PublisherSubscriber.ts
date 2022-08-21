/* eslint-disable no-prototype-builtins */
/**
 * Subscribe and unsubscribe from a publisher that pushes messages to subscribers
 */

export interface Data {
  message: string;
}
type Callback = (data: Data) => void;

class PubSub {
  private topics: Record<string, Callback[]> = {};

  subscribe(topic: string, callback: Callback) {
    if (!this.topics.hasOwnProperty(topic)) this.topics[topic] = [];

    const index = this.topics[topic].push(callback) - 1;

    const remove = () => {
      this.topics[topic] = this.topics[topic].filter((cb, i) => i !== index);
    };
    return remove;
  }

  publish(topic: string, data: Data = { message: 'No message.' }) {
    if (!this.topics.hasOwnProperty(topic)) return;

    this.topics[topic].forEach(func => func(data));
  }
}

export default PubSub;
