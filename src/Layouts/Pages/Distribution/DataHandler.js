import moment from "moment";

class DataHandler {
  static columns() {
    return [
      { width: 220, name: 'actions', header: 'Actions' },
      { defaultFlex: 1, minWidth: 120, name: 'order_at', header: 'Order Date' },
      { defaultFlex: 1, minWidth: 220, name: 'patient_name', header: 'Patient Name' },
      { defaultFlex: 1, minWidth: 280, name: 'shortDescription', header: 'Short Description' },
   
      { defaultFlex: 1, minWidth: 100, name: 'size', header: 'Size' },
      { defaultFlex: 1, minWidth: 100, name: 'flavor', header: 'Flavor/Color' },
      { defaultFlex: 1, minWidth: 160, name: 'order_qty', header: 'Ordered Qty' },
      { defaultFlex: 1, minWidth: 160, name: 'vendor', header: 'Vendor' },
     { defaultFlex: 1, minWidth: 240, name: 'description', header: 'Description' },
      { defaultFlex: 1, minWidth: 200, name: 'category', header: 'Category' },
      { defaultFlex: 1, minWidth: 160, name: 'order_qty', header: 'Ordered Qty' },
      { defaultFlex: 1, minWidth: 160, name: 'unit_uom', header: 'Unit Uom' },
      { defaultFlex: 1, minWidth: 160, name: 'estimated_total_amt', header: 'Estimated Amount' },
      { defaultFlex: 1, minWidth: 260, name: 'delivery_location', header: 'Location' },
      { defaultFlex: 1, minWidth: 160, name: 'order_status', header: 'Order Status' },
      { defaultFlex: 1, minWidth: 160, name: 'stock_status', header: 'Stock Status' },
      { defaultFlex: 1, minWidth: 200, name: 'requestor', header: 'Requested By' },
      { defaultFlex: 1, minWidth: 120, name: 'group_id', header: 'Group ID' }
      
      
      
    ]
  }
  static mapData(items, lang) {
    items.forEach(item => {
      if(item.order_at.indexOf('T') !== -1) {
        item.order_at = item.order_at.substring(0,10);
      } else {
      item.order_at = moment(new Date(item.order_at)).utc().format('YYYY-MM-DD');
      }
    })
  return items;
  }
}
 
export default DataHandler;
