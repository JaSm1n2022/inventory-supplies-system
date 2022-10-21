
class DataHandler {
  static columns() {
    return [
      { width: 120, name: 'edit', header: 'EDIT' },
      { defaultFlex: 1, minWidth: 120, name: 'name', header: 'Name' },
      { defaultFlex: 1, minWidth: 200, name: 'address', header: 'Address' },
      { defaultFlex: 1, minWidth: 200, name: 'locationType', header: 'Location Type' },
      { defaultFlex: 1, minWidth: 200, name: 'contactPerson', header: 'Contact Person' },
      { defaultFlex: 1, minWidth: 200, name: 'phone', header: 'Phone' },
      { defaultFlex: 1, minWidth: 200, name: 'fax', header: 'Fax' },
     
    ]
  }
  static mapData(items, lang) {
  return items;
  }
}
 
export default DataHandler;
