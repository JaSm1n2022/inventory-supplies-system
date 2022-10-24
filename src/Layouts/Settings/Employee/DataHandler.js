import moment from "moment";

class DataHandler {
  static columns() {
    console.log('[Columns called]');
    return [
      { width: 220, name: 'actions', header: 'Actions' },
      { defaultFlex: 1, minWidth: 120, name: 'created_at', header: 'Created' },
      { defaultFlex: 1, minWidth: 120, name: 'name', header: 'Employee Name' },
      { defaultFlex: 1, minWidth: 200, name: 'position', header: 'Position' },
      { defaultFlex: 1, minWidth: 200, name: 'email', header: 'Email' },
      { defaultFlex: 1, minWidth: 100, name: 'phone', header: 'Contact Number' },
      { defaultFlex: 1, minWidth: 100, name: 'employment_status', header: 'Employment Status' },
      { defaultFlex: 1, minWidth: 100, name: 'hired_at', header: 'Date Hired' },
      { defaultFlex: 1, minWidth: 120, name: 'dob', header: 'DOB' },
     
    ]
  }
  static mapData(items) {
    
    items.forEach(item => {
      item.created_at = moment(item.created_at).format('YYYY-MM-DD');
      item.hired_at = moment(item.hired_at).format('YYYY-MM-DD');
      item.dob = moment(item.dob).format('YYYY-MM-DD');
    
    });

  return items;
  }
}
 
export default DataHandler;
