/**
 * Compose objects into tree structures to represent part-whole hierarchies.
 * Composite lets clients treat individual objects and compositions of objects uniformly.
 */

/**
 * Items
 */
abstract class BaseItem {
  constructor(protected name: string, protected type: string) {}

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  abstract getDetails(): Record<string, string> | Record<string, string>[];
}

export class MobilePhone extends BaseItem {
  constructor(
    protected name: string,
    private color: string,
    private cost: number
  ) {
    super(name, 'Mobile Phone');
  }
  getDetails() {
    return { name: this.name, type: this.type };
  }

  getColor() {
    return this.color;
  }

  getCost() {
    return this.cost;
  }
}

export class Laptop extends BaseItem {
  constructor(
    protected name: string,
    private model: string,
    private cost: number
  ) {
    super(name, 'Laptop');
  }
  getDetails() {
    return { name: this.name, type: this.type };
  }

  getModel() {
    return this.model;
  }

  getCost() {
    return this.cost;
  }
}

/**
 * Catalogs (composite)
 */
export class Catalog extends BaseItem {
  private collection: BaseItem[] = [];
  constructor(protected name: string) {
    super(name, 'Catalog');
  }

  add(product: BaseItem) {
    this.collection.push(product);
    return this;
  }

  getDetails() {
    console.log(this.name);
    return this.collection.map(product => product.getDetails()) as Record<
      string,
      string
    >[];
  }
}
