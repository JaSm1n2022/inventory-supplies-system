import moment from "moment";

class DataHandler {
  static columns() {
    console.log('[Columns called]');
    return [
      { width: 220, name: 'actions', header: 'Actions' },
      { defaultFlex: 1, minWidth: 120, name: 'name', header: 'Vendor Name' },
      { defaultFlex: 1, minWidth: 200, name: 'website', header: 'Website' },
      { defaultFlex: 1, minWidth: 200, name: 'location', header: 'Location' },
      { defaultFlex: 1, minWidth: 100, name: 'contact_person', header: 'Contact Person' },
      { defaultFlex: 1, minWidth: 100, name: 'phone', header: 'Phone' },
      { defaultFlex: 1, minWidth: 100, name: 'fax', header: 'Fax' },
      { defaultFlex: 1, minWidth: 120, name: 'account_number', header: 'Account Number' }
     
    ]
  }
  static mapData(items) {
    
    
  return items;
  }
}
 
export default DataHandler;
