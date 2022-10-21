import moment from "moment";

class DataHandler {
  static columns() {
    return [
      { width: 220, name: 'actions', header: 'Actions' },
      { defaultFlex: 1, minWidth: 120, name: 'created_at', header: 'Created' },
      { defaultFlex: 1, minWidth: 120, name: 'category', header: 'Category' },
      { defaultFlex: 1, minWidth: 200, name: 'item', header: 'Item' },
      { defaultFlex: 1, minWidth: 200, name: 'description', header: 'Description' },
      { defaultFlex: 1, minWidth: 100, name: 'qty', header: 'Qty' },
      { defaultFlex: 1, minWidth: 100, name: 'qty_uom', header: 'Qty Uom' },
      { defaultFlex: 1, minWidth: 100, name: 'count', header: 'Pcs/Qty Uom' },
      { defaultFlex: 1, minWidth: 100, name: 'size', header: 'Size' },
      { defaultFlex: 1, minWidth: 120, name: 'dimension', header: 'Dimension' },
      { defaultFlex: 1, minWidth: 120, name: 'unit_price', header: 'Unit Price' },
      { defaultFlex: 1, minWidth: 120, name: 'price_per_pcs', header: 'Price Per Pcs' },
      { defaultFlex: 1, minWidth: 120, name: 'vendor', header: 'Vendor' }
     
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
