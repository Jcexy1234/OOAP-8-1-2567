class Customer {
  orders = [];  // Change 'Order' to 'orders'
  constructor(name, address) {
      this.name = name;
      this.address = address;  // Change 'addres' to 'address'
  }
  addOrder(order) {
      this.orders.push(order);  // Change 'Order' to 'orders'
  }
}

class Order {
  Payment = null;
  orderDetails = [];
  constructor(date, status) {
      this.date = date;
      this.status = status;
  }

  calcSubTotal() {
      const subTotal =0;
      for(let  i=0; i< this.orderDetails.length; i++){
        subTotal += this.orderDetails[i].subTotal();
      }
      return subTotal;
    //return this.orderDetails.reduce(
       // (total,orderDetail)=>total + orderDetail.subTotal(),
       // 0
        //);
  }

  calcTax() {
      let tax=0;
      for(let i=0; i< this.orderDetails.length; i++){
        tax += this.orderDetails[i].calcTax();
      }
      return tax;
  }

  calcTotal() {
      return this.calcSubTotal()+ this.calcTax();
  }

  calcTotalWeight() {
      console.log("calcTotalWeight");
  }

  addPayment(payment) {  // Change 'Payment' to 'payment'
      this.payment = payment;  // Change 'Payment' to 'payment'
  }

  addOrderDetail(orderDetail) {
      this.orderDetails.push(orderDetail);
  }
}

class OrderDetail {
  item = null;
  constructor(quantity, taxStatus) {
      this.quantity = quantity;
      this.taxStatus = taxStatus;
  }

  calcSubTotal() {
      return this.item.getPriceForQuantity(this.quantity)+this.calcTax();
  }

  calcWeight() {
      return this.item.shippingWeight;
  }

  calcTax() {
      return this.item.getTax(this.taxStatus);
  }

  addItem(item) {
      this.item = item;
  }
}

class Item {
  inStock = true;
  constructor(shippingWeight, description, price) {
      this.shippingWeight = shippingWeight;
      this.description = description;
      this.price = price;
  }
  setInstock(status){
    this.inStock = status;
  }

  getPriceForQuantity(quantity) {
      return this.price* quantity;
  }

  getTax(taxStatus) {
    if(taxStatus === "Tax included"){
      return 0;
    }
    else{
      return this.price * 0.07;
    }
      console.log("getTax");
  }

  inStock() {
     return this.inStock;
  }
}

class Payment {
  constructor(amount) {
      this.amount = amount;
  }
}

class Cash extends Payment {
  constructor(amount, cashTendered) {
      super(amount);
      this.cashTendered = cashTendered;
  }
}

class Check extends Payment {
  constructor(amount, name, bankID) {
      super(amount);
      this.name = name;
      this.bankID = bankID;
  }

  authorized() {
      console.log("authorized");
  }
}

class Credit extends Payment {
  constructor(amount, number, type, expDate) {
      super(amount);
      this.number = number;
      this.type = type;
      this.expDate = expDate;
  }

  authorized() {
      console.log("authorized");
  }
}

const main = () => {
  let customer1 = new Customer("Chayatip Netkeaw", "111/64");  
  console.log(customer1);
  const item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
  const item2 = new Item(0.1, "ป๊อบบอมบ์แซ่บ", 39);
  const item3 = new Item(0.2, "เดอะบอกซ์ ออลสตาร์", 159);
  const item4 = new Item(0.3, "เดอะบอกซ์ซิคเนเจอร์", 169);
  const item5 = new Item(0.5, "ชุดข้าวไก่กรอบแกงเขียวหวาน เคเอฟซีร์", 109);

  //create order 
  const order1 = new Order("08/01/2567", "In process");

  
  //add order 
  customer1.addOrder(order1);
 
  //console.log(order1);

  const orderDetail1 = new OrderDetail(5, "tax included");
  orderDetail1.addItem(item2);
  const orderDetail2 = new OrderDetail(2, "tax included");
  orderDetail2.addItem(item3);
  
 


  order1.addOrderDetail(orderDetail1);
  order1.addOrderDetail(orderDetail2);
  

  //console.log(orderDetaill);

    //ชื่อ: Chayatip Netkeaw
    //จำนวนการสั่งซิ้อ :1
    //ลำดับที่คำสั่งซื้อ1 ออลอินวันบักเก็ต จำนวน 5 รายการราคา  1495 บาท
    //ลำดับที่คำสั่งซื้อ2 ชุดข้าวไก่กรอบแกงเขียวหวาน เคเอฟซีร์ จำนวน 1 รายการ 109 บาท
    //3 รวมทั้งหมด 1604 บาท


    //ชื่อ: Chayatip Netkeaw
    //จำนวนการสั่งซิ้อ :2
    //ลำดับที่คำสั่งซื้อ1 เดอะบอกซ์ ออลสตาร์ จำนวน 3 รายการราคา  477 บาท
    //ลำดับที่คำสั่งซื้อ2 ป๊อบบอมบ์แซ่บ จำนวน 2 รายการ 78 บาท
    //3 รวมทั้งหมด 555 บาท

    console.log(customer1);
  console.log("ชื่อ: " + customer1.name);
  console.log("จำนวนการสั่งซื้อ: " + customer1.orders.length);

  for (let i = 0; i < customer1.orders.length; i++) {
      console.log("คำสั่งซื้อ: " + (i + 1));
      let total = 0;

      for (let k = 0; k < customer1.orders[i].orderDetails.length; k++) {
          const item = customer1.orders[i].orderDetails[k].item;
          const quantity = customer1.orders[i].orderDetails[k].quantity;
          const subTotal = quantity * item.price;  
          total += subTotal;

          console.log(
              "ลำดับที่" +
              (k + 1) +
              " " +
              item.description +
              " จำนวน " +
              quantity +
              " รายการ " +
              " ราคา " +
              subTotal +
              " บาท"
          );
      }

      console.log("รวมทั้งหมด: " + total + " บาท");
  }
};

    
main();