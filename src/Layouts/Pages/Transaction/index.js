
import { Button, CircularProgress, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";

import { ACTION_STATUSES, SUPPLY_STATUS } from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';

import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import { transactionCreateStateSelector, transactionDeleteStateSelector, transactionListStateSelector, transactionUpdateStateSelector } from "../../../store/selectors/transactionSelector";
import { attemptToCreateTransaction, attemptToDeleteTransaction, attemptToFetchTransaction, attemptToUpdateTransaction, resetCreateTransactionState, resetDeleteTransactionState, resetFetchTransactionState, resetUpdateTransactionState } from "../../../store/actions/transactionAction";


import Helper from "../../../utils/helper";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";
import { productListStateSelector } from "../../../store/selectors/productSelector";
import { attemptToFetchProduct, resetFetchProductState } from "../../../store/actions/productAction";
import moment from "moment";
import { attemptToFetchStock, attemptToUpdateStock, resetFetchStockState, resetUpdateStockState } from "../../../store/actions/stockAction";
import { stockListStateSelector, stockUpdateStateSelector } from "../../../store/selectors/stockSelector";


let productList = [];
let stockList = [];
let originalSource = [];
let grandTotal = 0.0;
let isFetchAllDone = false;
let isProductDone = false;
let isStockDone = false;
let isTransactionDone = false;
let isUpdateStockDone = true;
let isUpdateTransactionDone = true;

const Transaction = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(DataHandler.columns());
  const [isTransactionsCollection, setIsTransactionsCollection] = useState(true);
  const [isCreateTransactionCollection, setIsCreateTransactionCollection] = useState(true);
  const [isUpdateTransactionCollection, setIsUpdateTransactionCollection] = useState(true);
  const [isDeleteTransactionCollection, setIsDeleteTransactionCollection] = useState(true);
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState('create');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [anchorEl, setAnchorEl] = useState(undefined);
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

    if (!isTransactionsCollection && props.transactions && props.transactions.status === ACTION_STATUSES.SUCCEED) {
      props.resetlistTransactions();

      setIsTransactionsCollection(true);
    }

    if (!isCreateTransactionCollection && props.CreateTransactionState && props.CreateTransactionState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateTransaction();

      setIsCreateTransactionCollection(true);

    }
    if (!isUpdateTransactionCollection && props.UpdateTransactionState && props.UpdateTransactionState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateTransaction();

      setIsUpdateTransactionCollection(true);


    }
    if (!isDeleteTransactionCollection && props.DeleteTransactionState && props.DeleteTransactionState.status === ACTION_STATUSES.SUCCEED) {
      console.log('[change me to true]');
      props.resetDeleteTransaction();
      setIsDeleteTransactionCollection(true);

    }
  }, [isTransactionsCollection, isCreateTransactionCollection, isUpdateTransactionCollection, isDeleteTransactionCollection]);
  useEffect(() => {
    const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
    setDateFrom(dates.from);
    setDateTo(dates.to);
    console.log('[dates]', dates);
    props.listProducts();
    props.listStocks();
    props.listTransactions({ from: dates.from, to: dates.to });
  }, []);
  console.log('[props.products[', props.products);
  if (props.products && props.products.status === ACTION_STATUSES.SUCCEED) {
    isProductDone = true;
    productList = [];
    productList = props.products.data;
    //productList = productList.filter(p => p.status);
    productList.forEach(item => {

      item.name = item.description;
      item.value = item.description;
      item.label = item.description;
      item.categoryType = 'description'

    });

    props.resetListProducts();
  }

  const filterByDateHandler = (dates) => {
    setDateTo(dates.to);
    setDateFrom(dates.from);
    isTransactionDone = false;
    props.listTransactions({ from: dates.from, to: dates.to });
  }
  console.log('[props.transactions]', props.transactions);
  if (props.stocks && props.stocks.status === ACTION_STATUSES.SUCCEED) {
    if (props.stocks.data && props.stocks.data.length) {
      stockList = [...props.stocks.data];
    }
    isStockDone = true;
    props.resetListStocks();
  }
  if (isTransactionsCollection && props.transactions && props.transactions.status === ACTION_STATUSES.SUCCEED) {
    grandTotal = 0.0;
    isTransactionDone = true;
    let source = props.transactions.data;
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
    setDataSource(source);
    originalSource = [...source];
    setIsTransactionsCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    console.log('[delete transaction id]', id);
    props.DeleteTransaction(id);
  }
  const createTransactionHandler = (general, details, mode) => {
    const finalPayload = [];
    for (const detail of details) {
      const params = {
        created_at: new Date(),
        ordered_at: moment(general.orderedDt).format('YYYY-MM-DD 00:00:00'),
        order_number: general.orderNumber,
        description: detail.description,
        category: detail.category,
        item: detail.item,
        size: detail.size,
        dimension: detail.dimension,
        qty: detail.qty,
        qty_uom: detail.qty_uom,
        unit_piece: detail.count,
        total_pcs: detail.count * detail.qty,
        unit_price: detail.unit_price,
        total_price: detail.totalPrice,
        price_per_pcs: detail.price_per_pcs,
        vendor: detail.vendor,
        status: general.status ? general.status.name : '',
        product_id: detail.productInfo ? detail.productInfo.id : undefined,
        expected_delivery_at: general.expectedDeliveryDt,
        payment_method: general.paymentMethod ? general.paymentMethod.name : '',
        payment_info: general.paymentInfo,
        payment_transaction_at: general.paymentDt,
        grand_total: detail.grandTotal
      };
      if (mode === 'edit') {
        params.id = general.id;
      }

      finalPayload.push(params);
    }

    if (mode === 'create') {
      props.CreateTransaction(finalPayload);

    } else if (mode === 'edit') {

      props.updateTransaction(finalPayload);
    }

    console.log('[params]', finalPayload);
    setIsFormModal(false);




  }
  const changeStatusHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeChangeStatusMenuHandler = () => {
    setAnchorEl(null);
  }
  const updateStatusHandler = (stat) => {
    const selectedData = dataSource.filter((r) => r.isChecked);
    console.log('[selected Data Status]', selectedData, stat);
    const forUpdateStatus = [];
    const forStockUpdates = [];


    selectedData.forEach(sel => {
      if (stockList && stockList.length && sel.product_id && stat.toLowerCase() === 'delivered' && stat !== sel.status) {
        console.log('[selMe]', sel);
        const stock = stockList.find(s => s.productId === sel.product_id);
        console.log('[stocks]', stock);
        let qty = parseInt(sel.qty, 10);

        forStockUpdates.push(
          {
            id: stock.id,
            qty_on_hand: Math.abs(parseInt(stock.qty_on_hand, 10) + parseInt(qty, 10))

          });
      }
      forUpdateStatus.push({
        id: sel.id,
        status: stat
      });
    })
    setAnchorEl(null);
    console.log('[forUpdateStatus]', forUpdateStatus);
    if (forStockUpdates.length) {
      isUpdateStockDone = false;
      props.updateStock(forStockUpdates);
    }
    isUpdateTransactionDone = false;
    props.updateTransaction(forUpdateStatus);

  }
  console.log('[Is Create Transaction Collection]', props.CreateTransactionState);
  if (isCreateTransactionCollection && props.CreateTransactionState && props.CreateTransactionState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateTransactionCollection(false);
    isTransactionDone = false;
    props.listTransactions({ from: dateFrom, to: dateTo });

  }
  if (isUpdateTransactionCollection && props.UpdateTransactionState && props.UpdateTransactionState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateTransactionCollection(false);
    isUpdateTransactionDone = true;
    isTransactionDone = false;
    props.listTransactions({ from: dateFrom, to: dateTo });

  }
  console.log('[isDeleteTransaction]', isDeleteTransactionCollection, props.DeleteTransactionState);
  if (isDeleteTransactionCollection && props.DeleteTransactionState && props.DeleteTransactionState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteTransactionCollection(false);
    isTransactionDone = false;
    props.listTransactions({ from: dateFrom, to: dateTo });

  }
  if (props.updateStockState && props.updateStockState.status === ACTION_STATUSES.SUCCEED) {
    isUpdateStockDone = true;
    props.resetUpdateStock();
  }

  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]', keyword);
    if (!keyword) {
      setDataSource([...originalSource]);
      grandTotal = 0.0;
      const grands = [...originalSource].map(map => map.grand_total);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
    } else {
      const temp = [...originalSource];

      const found = temp.filter(data => (data.description && data.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
        || (data.order_number && data.order_number.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
        || (data.payment_info && data.payment_info.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
        || (data.vendor && data.vendor.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
        || (data.category && data.category.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
      );

      grandTotal = 0.0;
      const grands = found.map(map => map.grand_total);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
      setDataSource(found);


    }
  };
  const onCheckboxSelectionHandler = (data, isAll, itemIsChecked) => {

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
    let fileName = `transaction_list_batch_${new Date().getTime()}`;

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

  if (!isTransactionDone || !isProductDone || !isStockDone || !isUpdateStockDone || !isUpdateTransactionDone) {
    isFetchAllDone = false;
  } else {
    isFetchAllDone = true;
  }

  return (
    <React.Fragment>
      {!isFetchAllDone &&
        <div><CircularProgress size={20} />Loading...</div>
      }

      <Grid container style={{ display: isFetchAllDone ? '' : 'none', paddingLeft: 10, paddingRight: 10 }}>
        <Grid container justifyContent="space-between">
          <div>
            <Typography variant="h6">Supply Order Transaction</Typography>
          </div>
          <div>
            <FilterTable filterRecordHandler={filterRecordHandler} filterByDateHandler={filterByDateHandler} />
          </div>
        </Grid>
        <Grid container justifyContent="space-between" style={{ paddingBottom: 12, paddingTop: 12 }}>
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
              ADD TRANSACTION
            </Button>

            {isAddGroupButtons &&
              <div style={{ display: 'inline-flex', gap: 10 }}>
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
                <Button
                  onClick={changeStatusHandler}
                  variant="contained"
                  color="primary"
                  aria-controls="simple-menu" aria-haspopup="true"
                  component="span"
                  endIcon={<ArrowDownwardIcon />}
                >

                  Change Status
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={closeChangeStatusMenuHandler}
                >
                  {SUPPLY_STATUS.map(map => {
                    return (
                      <MenuItem onClick={() => updateStatusHandler(map)}>{map}</MenuItem>
                    )
                  })}
                </Menu>
              </div>


            }
          </div>
          <Typography variant="h5">{`GRAND TOTAL: $${parseFloat(grandTotal || 0.00).toFixed(2)}`} </Typography>

        </Grid>
        <Grid item xs={12}>

          <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
        </Grid>
      </Grid>
      
    
    }
      {isFormModal &&
        <TransactionForm productList={productList} createTransactionHandler={createTransactionHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  products: productListStateSelector(store),
  transactions: transactionListStateSelector(store),
  CreateTransactionState: transactionCreateStateSelector(store),
  UpdateTransactionState: transactionUpdateStateSelector(store),
  DeleteTransactionState: transactionDeleteStateSelector(store),
  stocks: stockListStateSelector(store),
  updateStockState: stockUpdateStateSelector(store),

});

const mapDispatchToProps = dispatch => ({
  listProducts: (data) => dispatch(attemptToFetchProduct(data)),
  resetListProducts: () => dispatch(resetFetchProductState()),
  listTransactions: (data) => dispatch(attemptToFetchTransaction(data)),
  resetlistTransactions: () => dispatch(resetFetchTransactionState()),
  CreateTransaction: (data) => dispatch(attemptToCreateTransaction(data)),
  resetCreateTransaction: () => dispatch(resetCreateTransactionState()),
  updateTransaction: (data) => dispatch(attemptToUpdateTransaction(data)),
  resetUpdateTransaction: () => dispatch(resetUpdateTransactionState()),
  DeleteTransaction: (data) => dispatch(attemptToDeleteTransaction(data)),
  resetDeleteTransaction: () => dispatch(resetDeleteTransactionState()),
  listStocks: (data) => dispatch(attemptToFetchStock(data)),
  resetListStocks: () => dispatch(resetFetchStockState()),
  updateStock: (data) => dispatch(attemptToUpdateStock(data)),
  resetUpdateStock: () => dispatch(resetUpdateStockState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);

