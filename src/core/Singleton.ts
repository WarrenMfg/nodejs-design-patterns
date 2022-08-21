/**
 * Singletons are objects that can only have a single instance, with a single point of access
 */

class Singleton {
  private static instance: Singleton;

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  run() {
    console.log('running');
  }
}

export default Singleton;
