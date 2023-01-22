// @flow

export type BaseAction = {
  type: string,
  payload: ?any
};

export type InvoiceState = {
  invoiceList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  invoiceUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  invoiceDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  invoiceCreate : {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};
export type ProductState = {
  productList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  productUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  productDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  productCreate: {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};


export type EmployeeState = {
  employeeList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  employeeUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  employeeDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  employeeCreate: {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};

export type VendorState = {
  vendorList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  vendorUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  vendorDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  vendorCreate: {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};


export type TemplateState = {
  templateList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  templateUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  templateDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  templateCreate: {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};

export type PatientState = {
  patientList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  patientUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  patientDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  patientCreate: {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};


export type StockState = {
  stockList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  stockUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  stockDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  stockCreate: {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};


export type TransactionState = {
  transactionList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  transactionUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  transactionDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  transactionCreate: {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};


export type DistributionState = {
  distributionList: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  distributionUpdate : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
 
  distributionDelete : {

    data: ?Object,
    error: ?string,
    status: ?string
  },
  distributionCreate: {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};



export type MediaUploadState = {
  error: ?string,
  status: ?string,
  s3_url: ?string
};
export type MediaUserPhotoState = {
  error: ?string,
  status: ?string,
  userPhoto_url: ?string
};


export type MediaExcelState = {
  excel: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
}
export type MediaPdfState = {
  pdf: {
    data: ?Object,
    error: ?string,
    status: ?string
  }
}


