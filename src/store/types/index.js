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


