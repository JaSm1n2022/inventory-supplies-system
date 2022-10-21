import moment from "moment";

class DataHandler {
  static columns() {
    return [
      { width: 220, name: 'actions', header: 'Actions' },
      { defaultFlex: 1, minWidth: 200, name: 'invoiced_at', header: 'Invoice Date' },
      { defaultFlex: 1, minWidth: 200, name: 'invoice_number', header: 'Invoice Number' },
      { defaultFlex: 1, minWidth: 200, name: 'grand_total', header: 'Grand Total' },
      { defaultFlex: 1, minWidth: 200, name: 'payment_method', header: 'Payment Method' },
      { defaultFlex: 1, minWidth: 200, name: 'payment_info', header: 'Payment Info' },
      { defaultFlex: 1, minWidth: 200, name: 'payment_at', header: 'Payment Date' },
      { defaultFlex: 1, minWidth: 200, name: 'vendor', header: 'Vendor' },
     
    ]
  }
  static mapData(items) {
    
    items.forEach(item => {
      item.invoiced_at = moment(item.invoiced_at).format('YYYY-MM-DD HH:mm');
      item.payment_at = moment(item.payment_at).format('YYYY-MM-DD HH:mm');
      item.grand_total = parseFloat(item.grand_total || 0.00).toFixed(2);
    });

  return items;
  }
}
 
export default DataHandler;
