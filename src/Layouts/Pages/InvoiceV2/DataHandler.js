import moment from "moment";

class DataHandler {
  static columns() {
    return [
      { defaultFlex: 1, minWidth: 200, name: 'ordered_at', header: 'Invoice Date' },
      { defaultFlex: 1, minWidth: 200, name: 'order_number', header: 'Invoice Number' },
      { defaultFlex: 1, minWidth: 200, name: 'grand_total', header: 'Grand Total' },
      { defaultFlex: 1, minWidth: 200, name: 'vendor', header: 'Vendor' },
      { defaultFlex: 1, minWidth: 200, name: 'payment_info', header: 'Payment Info' },
   
      { defaultFlex: 1, minWidth: 200, name: 'payment_method', header: 'Payment Method' },
      { defaultFlex: 1, minWidth: 200, name: 'payment_transaction_at', header: 'Payment Date' },
     
    ]
  }
  static mapData(items) {
    let orderNumbers = items.map(map => map.order_number);
    orderNumbers = Array.from(new Set(orderNumbers));
    const newItems = [];
    orderNumbers.forEach(each => {
      const list = items.filter(item => item.order_number === each);
      
      const [latest] = list;
      latest.ordered_at = moment(latest.ordered_at).format('YYYY-MM-DD HH:mm');
      latest.payment_transaction_at = moment(latest.payment_transaction_at).format('YYYY-MM-DD HH:mm');
      let grandTotal = 0.0;
      list.forEach(i =>  {
        grandTotal += i.grand_total;
      });
      latest.grand_total = parseFloat(grandTotal).toFixed(2);
      newItems.push(latest);
    })
   
  return newItems;
  }
}
 
export default DataHandler;
