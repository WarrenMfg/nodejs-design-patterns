/**
 * Aims at low cohesion and decoupling of modules and dependencies.
 * Simply accept dependencies as inputs instead of hardcoding
 */
import { appendFile } from 'fs';
import { join } from 'path';

const logFile = join(__dirname, 'activity.log');

const fileLogger = (log: unknown) => {
  if (!log) return;
  const date = new Date();
  appendFile(
    logFile,
    `${date}: ${typeof log === 'string' ? log : JSON.stringify(log)}\n`,
    error => {
      if (error) {
        console.error(error);
      }
    }
  );
};

type Logger = typeof console.log | typeof fileLogger;

class MyBankAccount {
  private balance = 0;

  constructor(private logger: Logger = console.log) {}

  withdraw(amount: number) {
    this.balance -= amount;
    this.logger(`Withdrawing ${amount}`);
    return this;
  }

  deposit(amount: number) {
    this.balance += amount;
    this.logger(`Depositing ${amount}`);
    return this;
  }

  checkBalance() {
    this.logger(this.balance);
    return this;
  }
}

export default new MyBankAccount(fileLogger);
