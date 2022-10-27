import moment from "moment";

class DataHandler {
  static columns() {
    return [
      { width: 220, name: 'actions', header: 'Actions' },
      { defaultFlex: 1, minWidth: 120, name: 'ordered_at', header: 'Date Order  ' },
      { defaultFlex: 1, minWidth: 200, name: 'order_number', header: 'Order Number' },
      { defaultFlex: 1, minWidth: 200, name: 'grand_total', header: 'Grand Total (tax/shipping)' },
      { defaultFlex: 1, minWidth: 200, name: 'description', header: 'Description' },
      { defaultFlex: 1, minWidth: 200, name: 'category', header: 'Category' },
      { defaultFlex: 1, minWidth: 200, name: 'item', header: 'Item' },
      { defaultFlex: 1, minWidth: 200, name: 'size', header: 'Size' },
      { defaultFlex: 1, minWidth: 200, name: 'dimension', header: 'Dimension' },
      { defaultFlex: 1, minWidth: 200, name: 'qty', header: 'Quantity' },
      { defaultFlex: 1, minWidth: 200, name: 'qty_uom', header: 'Quantity Uom' },
      { defaultFlex: 1, minWidth: 200, name: 'unit_piece', header: 'Unit Piece' },
      { defaultFlex: 1, minWidth: 200, name: 'total_pcs', header: 'Total Pcs' },
      { defaultFlex: 1, minWidth: 200, name: 'unit_price', header: 'Unit Price' },
      { defaultFlex: 1, minWidth: 200, name: 'total_price', header: 'Total Price' },
      { defaultFlex: 1, minWidth: 200, name: 'price_per_pcs', header: 'Price/Pcs' },
      { defaultFlex: 1, minWidth: 200, name: 'vendor', header: 'Vendor' },
      { defaultFlex: 1, minWidth: 200, name: 'status', header: 'Status' },
      { defaultFlex: 1, minWidth: 200, name: 'expected_delivery_at', header: 'Expected Delivery' },
      { defaultFlex: 1, minWidth: 200, name: 'payment_method', header: 'Payment Method' },
      { defaultFlex: 1, minWidth: 200, name: 'payment_info', header: 'Payment Info' },
      { defaultFlex: 1, minWidth: 200, name: 'payment_transaction_at', header: 'Paid On' },
      

      
     
    ]
  }x
  static mapData(items) {
    
    items.forEach(item => {
      item.ordered_at = moment(item.ordered_at).format('YYYY-MM-DD');
      item.payment_transaction_at = moment(item.payment_transaction_at).format('YYYY-MM-DD');
      item.expected_delivery_at = moment(item.expected_delivery_at).format('YYYY-MM-DD');
    
    });

  return items;
  }
}
 
export default DataHandler;
