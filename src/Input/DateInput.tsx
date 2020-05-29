
export default class DateInput {
    open_price: number;
    high_price: number;
    low_price: number;
    close_price: number;
    date: string;
    constructor(
      date: string,
      open_price: number,
      close_price: number,
      high_price: number,
      low_price: number
    ) {
      this.open_price = open_price;
      this.close_price = close_price;
      this.high_price = high_price;
      this.low_price = low_price;
      this.date = date;
    }
  }
DateInput.prototype.toString = function dogToString() {
    return `{date: "${this.date}", open_price: ${this.open_price}, close_price: ${this.close_price}, low_price: ${this.low_price}, high_price: ${this.high_price}}`;
};