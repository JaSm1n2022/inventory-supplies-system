import moment from "moment";

class DataHandler {
  static columns() {
    return [
      { width: 220, name: 'actions', header: 'Actions' },
      { defaultFlex: 1, minWidth: 120, name: 'category', header: 'Category' },
      { defaultFlex: 1, minWidth: 200, name: 'item', header: 'Item' },
      { defaultFlex: 1, minWidth: 220, name: 'description', header: 'Description' },
      { defaultFlex: 1, minWidth: 200, name: 'size', header: 'Size' },
      { defaultFlex: 1, minWidth: 200, name: 'dimension', header: 'Dimension' },
      
      { defaultFlex: 1, minWidth: 200, name: 'qty_on_hand', header: 'Quantity On Hand' },
      { defaultFlex: 1, minWidth: 200, name: 'incoming_qty', header: 'Incoming Quantity' },
      { defaultFlex: 1, minWidth: 200, name: 'projected_qty', header: 'Projected Qty' },
      { defaultFlex: 1, minWidth: 200, name: 'incoming_order_at', header: 'Projected Date' },
      { defaultFlex: 1, minWidth: 200, name: 'additional_info', header: 'Additional Info' },
      { defaultFlex: 1, minWidth: 200, name: 'comments', header: 'Comments' },
      { defaultFlex: 1, minWidth: 200, name: 'vendor', header: 'Vendor' },
      
     
    ]
  }
  static mapData(items) {
    
    items.forEach(item => {
      item.created_at = moment(item.created_at).format('YYYY-MM-DD');
    
    });

  return items;
  }
}
 
export default DataHandler;
