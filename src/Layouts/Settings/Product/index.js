
import { Button,Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";

import { ACTION_STATUSES} from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';

import ProductForm from "./ProductForm";
import { connect } from "react-redux";
import { productCreateStateSelector, productDeleteStateSelector, productListStateSelector, productUpdateStateSelector } from "../../../store/selectors/productSelector";
import { attemptToCreateProduct, attemptToDeleteProduct, attemptToFetchProduct, attemptToUpdateProduct, resetCreateProductState, resetDeleteProductState, resetFetchProductState, resetUpdateProductState } from "../../../store/actions/productAction";

import Helper from "../../../utils/helper";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";

let originalSource = [];

let grandTotal = 0;
function payloadHandler() {
  /*
  const payload = {
  from : `${DEFAULT_DATE_RANGE.from} 00:00:00`,
  to: `${DEFAULT_DATE_RANGE.to} 23:59:00`
*/

  return null;
}

const Product = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isProductsCollection, setIsProductsCollection] = useState(true);
  const [isCreateProductCollection, setIsCreateProductCollection] = useState(true);
  const [isUpdateProductCollection, setIsUpdateProductCollection] = useState(true);
  const [isDeleteProductCollection, setIsDeleteProductCollection] = useState(true);
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState('create');
  const [isAddGroupButtons, setIsAddGroupButtons] = useState(false);

  const createFormHandler = (data, mode) => {
    setItem(data);
    setMode(mode || 'create');
    setIsFormModal(true);
  }
  const closeFormModalHandler = () => {


    setIsFormModal(false);
  }

  useEffect(() => {

    if (!isProductsCollection && props.products && props.products.status === ACTION_STATUSES.SUCCEED) {
      props.resetListProducts();
      setIsProductsCollection(true);

    }

    if (!isCreateProductCollection && props.createProductState && props.createProductState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateProduct();
      setIsCreateProductCollection(true);

    }
    if (!isUpdateProductCollection && props.updateProductState && props.updateProductState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateProduct();
      setIsUpdateProductCollection(true);

      if (!isDeleteProductCollection && props.deleteProductState && props.deleteProductState.status === ACTION_STATUSES.SUCCEED) {
        props.resetDeleteProduct();
        setIsDeleteProductCollection(true);

      }
    }
  }, [isProductsCollection, isCreateProductCollection, isUpdateProductCollection, isDeleteProductCollection]);
  useEffect(() => {


    props.listProducts(payloadHandler());
  }, []);

  console.log('[props.Products]', props.products);
  if (isProductsCollection && props.products && props.products.status === ACTION_STATUSES.SUCCEED) {
    grandTotal = 0.0;
    let source = props.products.data;
    if (source && source.length) {
      source = DataHandler.mapData(source);
      const grands = source.map(map => map.grand_total);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
    }

    const cols = DataHandler.columns().map((col, index) => {
      if (col.name === 'actions') {
        return {
          ...col,
          editable: () => false,
          render: (cellProps) => <ActionsFunction deleteRecordItemHandler={deleteRecordItemHandler} createFormHandler={createFormHandler} data={{ ...cellProps.data }} />
        }

      } else {
        return {
          ...col,
          editable: () => false
        }
      }
    });
    setColumns(cols);
    originalSource = [...source];
    setDataSource(source);
    setIsProductsCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    props.deleteProduct(id);
  }
  const createProductHandler = (payload, mode) => {
    console.log('[Create Product Handler]', payload, mode);
    const params = {
      created_at: payload.created_at,
      category: payload.categoryName,
      qty_uom: payload.uom,
      qty: payload.qty,
      size: payload.size,
      dimension: payload.dimension,
      item: payload.item,
      description: payload.description,
      unit_price: payload.unitPrice,
      price_per_pcs : payload.pricePerPcs,
      vendor: payload.vendorName,
      count: payload.count,
      unit_distribution : payload.unit,
      short_description : payload.shortDescription,
      status : payload.status === 'Active' ? true : false

    };
    if (mode === 'create') {
      props.createProduct(params);

    } else if (mode === 'edit') {
      params.id = payload.id;
      props.updateProduct(params);
    }
    setIsFormModal(false);




  }
  console.log('[Is Create Product Collection]', props.createProductState);
  if (isCreateProductCollection && props.createProductState && props.createProductState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateProductCollection(false);
    props.listProducts();

  }
  if (isUpdateProductCollection && props.updateProductState && props.updateProductState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateProductCollection(false);
    props.listProducts();

  }
  if (isDeleteProductCollection && props.deleteProductState && props.deleteProductState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteProductCollection(false);
    props.listProducts();

  }
  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]',keyword);
    if(!keyword) {
      setDataSource([...originalSource]);
    } else {
    const temp = [...originalSource];
    console.log('[Keyword 1]',temp,keyword);
    const found = temp.filter( data => (data.description && data.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
    || (data.item && data.item.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
    || (data.category && data.category.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
    );
    console.log('[Keyword 2]',found);
   
   setDataSource(found);
    }
  };

  const onCheckboxSelectionHandler = (data, isAll, itemIsChecked) => {
    console.log('[data ALl]', data, isAll, itemIsChecked);
    const dtSource = [...dataSource];
    if (isAll) {
      dtSource.forEach(item => {
        item.isChecked = isAll; // reset
      });
    } else if (!isAll && data && data.length > 0) {
      dtSource.forEach(item => {
        if (item.id.toString() === data[0].toString()) {
          item.isChecked = itemIsChecked;
        }
      });

    } else if (!isAll && Array.isArray(data) && data.length === 0) {
      dtSource.forEach(item => {
        item.isChecked = isAll; // reset
      });
    }
    setIsAddGroupButtons(dtSource.find(f => f.isChecked));
    originalSource = [...dtSource];
    setDataSource(dtSource);

  }
  const exportToExcelHandler = () => {
    const excelData = dataSource.filter((r) => r.isChecked);
    const headers = columns;
    const excel = Helper.formatExcelReport(headers, excelData);
    console.log("headers", excel);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    let fileName = `product_list_batch_${new Date().getTime()}`;

    if (excelData && excelData.length) {
      import(/* webpackChunkName: 'json2xls' */ "json2xls")
        .then((json2xls) => {
          // let fileName = fname + '_' + new Date().getTime();
          const xls = typeof json2xls === 'function' ? json2xls(excel) : json2xls.default(excel);
          const buffer = Buffer.from(xls, "binary");
          // let buffer = Buffer.from(excelBuffer);
          const data = new Blob([buffer], { type: fileType });
          FileSaver.saveAs(data, fileName + fileExtension);
        })
        .catch((err) => {
          // Handle failure
          console.log(err);
        });
    }


  }



  return (
    <React.Fragment>
      <Grid container style={{paddingTop:12}}>
        <Grid container justifyContent="space-between">
          <div>
            <Typography variant="h6">PRODUCT MANAGEMENT</Typography>
          </div>
          <div>
            <FilterTable filterRecordHandler={filterRecordHandler} />
          </div>
        </Grid>

     

        <Grid container justifyContent="space-between" style={{ paddingBottom: 10 }}>
          <div style={{ display: 'inline-flex', gap: 10 }}>
            <Button
              onClick={() => createFormHandler()}
              variant="contained"
              style={{
                border: 'solid 1px #2196f3',
                color: 'white',
                background: '#2196f3',
                fontFamily: "Roboto",
                fontSize: "12px",
                fontWeight: 500,
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: 1.71,
                letterSpacing: "0.4px",
                textAlign: "left",
                cursor: 'pointer'
              }}
              component="span"
              startIcon={<AddIcon />}
            >
              ADD PRODUCT
            </Button>
            {isAddGroupButtons &&
              <Button
                onClick={() => exportToExcelHandler()}
                variant="contained"
                style={{
                  border: 'solid 1px blue',
                  color: 'white',
                  background: 'blue',
                  fontFamily: "Roboto",
                  fontSize: "12px",
                  fontWeight: 500,
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.71,
                  letterSpacing: "0.4px",
                  textAlign: "left",
                  cursor: 'pointer'
                }}
                component="span"
                startIcon={<AddIcon />}
              > Export Excel </Button>
            }
          </div>
        </Grid>
        <Grid item xs={12}>

          <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
        </Grid>
      </Grid>
      {isFormModal &&
        <ProductForm createProductHandler={createProductHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  products: productListStateSelector(store),
  createProductState: productCreateStateSelector(store),
  updateProductState: productUpdateStateSelector(store),
  deleteProductState: productDeleteStateSelector(store)

});

const mapDispatchToProps = dispatch => ({
  listProducts: (data) => dispatch(attemptToFetchProduct(data)),
  resetListProducts: () => dispatch(resetFetchProductState()),
  createProduct: (data) => dispatch(attemptToCreateProduct(data)),
  resetCreateProduct: () => dispatch(resetCreateProductState()),
  updateProduct: (data) => dispatch(attemptToUpdateProduct(data)),
  resetUpdateProduct: () => dispatch(resetUpdateProductState()),
  deleteProduct: (data) => dispatch(attemptToDeleteProduct(data)),
  resetDeleteProduct: () => dispatch(resetDeleteProductState())

});

export default connect(mapStateToProps, mapDispatchToProps)(Product);

