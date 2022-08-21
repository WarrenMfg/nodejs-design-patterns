/**
 * Separate the construction of a complex object from its representation so the same construction process can create different representations
 */
class PizzaBuilder {
  dough = '';
  sauce = '';
  cheese = '';
  toppings: string[] = [];

  setDough(dough: string) {
    this.dough = dough;
    return this;
  }

  setSauce(sauce: string) {
    this.sauce = sauce;
    return this;
  }

  setCheese(cheese: string) {
    this.cheese = cheese;
    return this;
  }

  setToppings(toppings: string[]) {
    this.toppings = toppings;
    return this;
  }

  build() {
    class Pizza {
      price = 0;
      bakeTime = 0;

      constructor(builder: PizzaBuilder) {
        if (builder.toppings.length <= 1) {
          this.price = 10;
          this.bakeTime = 8;
        } else if (builder.toppings.length === 2) {
          this.price = 11;
          this.bakeTime = 9;
        } else if (builder.toppings.length === 3) {
          this.price = 12;
          this.bakeTime = 10;
        } else {
          this.price = 15;
          this.bakeTime = 20;
        }
      }

      bake() {
        console.log(`Baking for ${this.bakeTime} minutes.`);
      }
    }

    return new Pizza(this);
  }
}

export default PizzaBuilder;
