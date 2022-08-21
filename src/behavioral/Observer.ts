/**
 * Define a one-to-many dependency between objects so when one object changes state,
 * all its dependencies are notified and updated automatically
 */
// Example: a forum/blog where users can subscribe to topics and get notified when there is an update
import { EventEmitter } from 'events';

// observer
export class User {
  private _id = Math.random();

  constructor(private messages: Record<string, string>[] = []) {}

  get id() {
    return this._id;
  }

  subscribeTo(topicId: string) {
    emitter.on(topicId, ({ topic, message }) =>
      this.enqueueMessage(topic, message)
    );
  }

  private enqueueMessage(topic: string, message: string) {
    this.messages.push({ topic, message });
  }

  getMessages() {
    this.messages.forEach(({ topic, message }) =>
      console.log(`${topic}: ${message}`)
    );
    this.messages = [];
  }
}

// observable
export class Topic {
  private topicId = Math.random();

  constructor(
    private topic: string,
    private subscribers: Record<string, User> = {},
    private messages: string[] = []
  ) {}

  subscribe(user: User) {
    if (this.subscribers[user.id]) return this;
    this.subscribers[user.id] = user;
    user.subscribeTo(this.topicId.toString());
    return this;
  }

  addMessage(message: string) {
    this.messages.push(message);
    this.notify(message);
    return this;
  }

  notify(message: string) {
    emitter.emit(this.topicId.toString(), {
      topic: this.topic,
      message,
    });
  }
}

// event bus
const emitter = new EventEmitter();
