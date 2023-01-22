
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";

import { ACTION_STATUSES } from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';

import StockForm from "./StockForm";
import { connect } from "react-redux";
import { stockCreateStateSelector, stockDeleteStateSelector, stockListStateSelector, stockUpdateStateSelector } from "../../../store/selectors/stockSelector";
import { attemptToCreateStock, attemptToDeleteStock, attemptToFetchStock, attemptToUpdateStock, resetCreateStockState, resetDeleteStockState, resetFetchStockState, resetUpdateStockState } from "../../../store/actions/stockAction";


import Helper from "../../../utils/helper";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";
import { productListStateSelector } from "../../../store/selectors/productSelector";
import { attemptToFetchProduct, resetFetchProductState } from "../../../store/actions/productAction";


let productList = [];
let grandTotal = 0;

let originalSource = undefined;
const Stock = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(DataHandler.columns());
  const [isStocksCollection, setIsStocksCollection] = useState(true);
  const [isCreateStockCollection, setIsCreateStockCollection] = useState(true);
  const [isUpdateStockCollection, setIsUpdateStockCollection] = useState(true);
  const [isDeleteStockCollection, setIsDeleteStockCollection] = useState(true);
  const [isProductCollection, setIsProductCollection] = useState(true);
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
    console.log('[useEffect]', isDeleteStockCollection, props.deleteStockState.status);

    if (!isStocksCollection && props.stocks && props.stocks.status === ACTION_STATUSES.SUCCEED) {
      props.resetListStocks();

      setIsStocksCollection(true);
    }

    if (!isCreateStockCollection && props.createStockState && props.createStockState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateStock();

      setIsCreateStockCollection(true);

    }
    if (!isUpdateStockCollection && props.updateStockState && props.updateStockState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateStock();

      setIsUpdateStockCollection(true);


    }
    if (!isDeleteStockCollection && props.deleteStockState && props.deleteStockState.status === ACTION_STATUSES.SUCCEED) {
      console.log('[change me to true]');
      props.resetDeleteStock();
      setIsDeleteStockCollection(true);

    }
    if (!isProductCollection && props.products && props.products.status === ACTION_STATUSES.SUCCEED) {
      console.log('[change me to true]');
      props.resetListProducts();
      setIsProductCollection(true);

    }
  }, [isProductCollection,isStocksCollection, isCreateStockCollection, isUpdateStockCollection, isDeleteStockCollection]);
  useEffect(() => {
    console.log('list stocks');
    props.listProducts();
  
  }, []);

  if (isProductCollection && props.products && props.products.status === ACTION_STATUSES.SUCCEED) {
    productList = [...props.products.data];
    productList.forEach(item => {
      item.name = item.description;
      item.value = item.description;
      item.label = item.description;
      item.categoryType = 'description'
    });
    setIsProductCollection(false);
    props.listStocks();
   
  }
  console.log('[props.Stocks]', props.stocks);
  const sortByWorth =  (items) => {
    items.sort((a, b) => {
      const tempA = !a.worth ? 0 : parseFloat(a.worth);
      const tempB = !b.worth ? 0 : parseFloat(b.worth);
      if (tempA > tempB) {
        return -1;
      } if (tempA < tempB) {
        return 1;
      }
      return 0;
    });

  
    console.log('[return me]',items);
    return items;
  };
  if (isStocksCollection && props.stocks && props.stocks.status === ACTION_STATUSES.SUCCEED) {
    grandTotal = 0.0;
    let source = props.stocks.data;
    if (source && source.length) {
      source = DataHandler.mapData(source,productList);
      const grands = source.map(map => map.worth);
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
    source = sortByWorth(source);
    setDataSource(source);
    setIsStocksCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    console.log('[delete stock id]', id);
    props.deleteStock(id);
  }
  const createStockHandler = (payload, mode) => {
    console.log('[Create Stock Handler]', payload, mode);
    const params = {
      created_at: new Date(),
      item: payload.item,
      dimension: payload.dimension,
      size: payload.size,
      description: payload.description,
      qty_on_hand: payload.qtyOnHand,
      incoming_qty: payload.incomingQty,
      projected_qty: payload.projectedQty,
      incoming_order_at: payload.projectedDate,
      productId: payload.productId,
      category: payload.category,
      additional_info: payload.info,
      comments: payload.comments,
      vendor: payload.vendor

    };
    if (mode === 'create') {
      props.createStock(params);

    } else if (mode === 'edit') {
      params.id = payload.id;
      props.updateStock(params);
    }
    setIsFormModal(false);




  }
  console.log('[Is Create Stock Collection]', props.createStockState);
  if (isCreateStockCollection && props.createStockState && props.createStockState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateStockCollection(false);
    props.listStocks();

  }
  if (isUpdateStockCollection && props.updateStockState && props.updateStockState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateStockCollection(false);
    props.listStocks();

  }
  console.log('[isDeleteStock]', isDeleteStockCollection, props.deleteStockState);
  if (isDeleteStockCollection && props.deleteStockState && props.deleteStockState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteStockCollection(false);
    props.listStocks();

  }

  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]',keyword);
    if(!keyword) {
      grandTotal = 0.0;
      const grands = [...originalSource].map(map => map.worth);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
      originalSource = sortByWorth(originalSource);
      setDataSource([...originalSource]);
    } else {
    const temp = [...originalSource];
    console.log('[Tempt]',temp);
    let found = temp.filter( data => data.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || (data.vendor &&data.vendor.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
    grandTotal = 0.0;
      const grands = found.map(map => map.worth);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
      found = sortByWorth(found);
   setDataSource(found);
    }
  };

  const onCheckboxSelectionHandler = (data, isAll, itemIsChecked) => {
    console.log('[data ALl]', data, isAll, itemIsChecked);
    let dtSource = [...dataSource];
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
    dtSource = sortByWorth(dtSource);
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
    let fileName = `stock_list_batch_${new Date().getTime()}`;

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
      <Grid container style={{ paddingTop: 10 }}>
        <Grid container justifyContent="space-between">
          <div>
            <Typography variant="h6">Stock Room Inventory</Typography>
          </div>
          <div>
            <FilterTable filterRecordHandler={filterRecordHandler} />
          </div>
        </Grid>

        <Grid container justifyContent="space-between" style={{ paddingBottom: 10,paddingTop:12}}>
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
              ADD STOCK
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
          <Typography variant="h6">{`Total Worth: $${parseFloat(grandTotal||0).toFixed(2)}`}</Typography>
          
        </Grid>
        <Grid item xs={12}>

          <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
        </Grid>
      </Grid>
      {isFormModal &&
        <StockForm filterRecordHandler={filterRecordHandler} productList={productList} dataSource={dataSource} createStockHandler={createStockHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  products: productListStateSelector(store),
  stocks: stockListStateSelector(store),
  createStockState: stockCreateStateSelector(store),
  updateStockState: stockUpdateStateSelector(store),
  deleteStockState: stockDeleteStateSelector(store),


});

const mapDispatchToProps = dispatch => ({
  listProducts: (data) => dispatch(attemptToFetchProduct(data)),
  resetListProducts: () => dispatch(resetFetchProductState()),
  listStocks: (data) => dispatch(attemptToFetchStock(data)),
  resetListStocks: () => dispatch(resetFetchStockState()),
  createStock: (data) => dispatch(attemptToCreateStock(data)),
  resetCreateStock: () => dispatch(resetCreateStockState()),
  updateStock: (data) => dispatch(attemptToUpdateStock(data)),
  resetUpdateStock: () => dispatch(resetUpdateStockState()),
  deleteStock: (data) => dispatch(attemptToDeleteStock(data)),
  resetDeleteStock: () => dispatch(resetDeleteStockState())


});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);

