/**
 * Encapsulate a request as an object, thereby letting your parameterize clients with different requests,
 * queue or log requests, and support operations that can be undone.
 */

// Invoker that invokes a command (.execute and .undo) kept in a stack
// Receiver that receives the command

type Db = Record<string, Post>;
const db: Db = {};

abstract class Command {
  abstract execute(db: Db): void;
  abstract undo(db: Db): void;
}

export class Post extends Command {
  public id = new Date().valueOf();
  constructor(public title: string, public content: string) {
    super();
  }

  execute(db: Db) {
    db[this.id] = this;
  }

  undo(db: Db) {
    delete db[this.id];
  }
}

// client
class Invoker {
  private stack: Command[] = [];
  constructor(private db: Db) {}

  execute(command: Command) {
    command.execute(this.db);
    this.stack.push(command);
    console.log(this.db);
  }

  undo() {
    const undone = this.stack.pop();
    if (undone) undone.undo(this.db);
    console.log(this.db);
  }
}

export default new Invoker(db);
