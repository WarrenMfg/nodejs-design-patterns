/**
 * Define a skeleton algorithm in an operation, deferring some steps to subclasses.
 * Lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure, or having multiple algorithms.
 * Similar to Strategy design pattern
 */

interface Account {
  funds: number;
}

interface Accounts {
  [x: string]: Account;
}
abstract class Bank {
  abstract _processDeposit(name: string, amount: number): void;
  abstract _processWithdraw(name: string, amount: number): void;

  private accounts: Accounts = {};

  constructor(name: string, initialFunds: number) {
    this.createAccount(name, initialFunds);
  }

  createAccount(name: string, initialFunds: number) {
    this.accounts[name] = { funds: initialFunds };
  }

  getAccount(name: string): Account | undefined {
    return this.accounts[name];
  }

  viewAccount(name: string) {
    const account = this.getAccount(name);
    if (account) {
      console.log(`${name} account: ${JSON.stringify(account)}`);
    } else {
      console.log(`${name} account not found!`);
    }
  }

  // skeleton
  deposit(name: string, amount: number) {
    return this._processDeposit(name, amount);
  }

  // skeleton
  withdraw(name: string, amount: number) {
    return this._processWithdraw(name, amount);
  }
}

export class Chase extends Bank {
  // subclass determines how to handle
  _processDeposit(name: string, amount: number): void {
    const account = this.getAccount(name);
    if (account) {
      account.funds += amount;
    } else {
      console.log(`${name} account not found!`);
    }
  }

  // subclass determines how to handle
  _processWithdraw(name: string, amount: number): void {
    const account = this.getAccount(name);
    if (account) {
      account.funds -= amount;
    } else {
      console.log(`${name} account not found!`);
    }
  }
}
