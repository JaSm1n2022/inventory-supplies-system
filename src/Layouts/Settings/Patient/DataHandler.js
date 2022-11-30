import moment from "moment";
import Helper from "../../../utils/helper";

class DataHandler {
  static columns() {
    console.log('[Columns called]');
    return [
      { width: 220, name: 'actions', header: 'Actions' },
      
      { defaultFlex: 1, minWidth: 200, name: 'name', header: 'Patient Name' },
      { defaultFlex: 1, minWidth: 120, name: 'mr_nbr', header: 'MR#' },
      { defaultFlex: 1, minWidth: 200, name: 'status', header: 'Status' },
      { defaultFlex: 1, minWidth: 200, name: 'soc_at', header: 'SOC' },
      { defaultFlex: 1, minWidth: 200, name: 'daysInHospice', header: 'Days in Hospice' },
      
      { defaultFlex: 1, minWidth: 200, name: 'eoc_at', header: 'EOC' },
      { defaultFlex: 1, minWidth: 200, name: 'assigned_cna', header: 'Assigned CNA' },
      { defaultFlex: 1, minWidth: 200, name: 'assigned_rn', header: 'Assigned Nurse' },
      { defaultFlex: 1, minWidth: 120, name: 'dob_at', header: 'DOB' },
      { defaultFlex: 1, minWidth: 200, name: 'cna_visit_freq', header: 'CN Visit Frequency' },
      { defaultFlex: 1, minWidth: 200, name: 'rn_visit_freq', header: 'RN Visit Frequency' },
      { defaultFlex: 1, minWidth: 200, name: 'care_type', header: 'Care Type' },
      { defaultFlex: 1, minWidth: 200, name: 'place_of_service', header: 'Place of Service' },
      { defaultFlex: 1, minWidth: 200, name: 'address', header: 'Address' },
      { defaultFlex: 1, minWidth: 120, name: 'contact_nbr', header:  'Contact Number' },
      
      
      
      
     
    ]
  }
  static mapData(items) {
    
    items.forEach(item => {
      item.created_at = moment(item.created_at).format('YYYY-MM-DD');
      item.soc_at = moment(item.soc_at).format('YYYY-MM-DD');
      item.eoc_at = item.status && item.status === 'Inactive' && item.eoc_at ? moment(item.eoc_at).format('YYYY-MM-DD') : '';
      item.dob_at = moment(item.dob_at).format('YYYY-MM-DD');
      item.daysInHospice = Helper.calculateDaysInStorage(new Date(item.soc_at));
    
    });

  return items;
  }
}
 
export default DataHandler;
