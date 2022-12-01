
import { Button, Grid, Typography } from "@mui/material";
import React, {useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";

import { ACTION_STATUSES} from "../../../utils/constants";
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


let productList = [];
let originalSource = [];
let grandTotal = 0.0;
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
  const [dateTo,setDateTo] = useState('');
  const [isAddGroupButtons,setIsAddGroupButtons] = useState(false);

  const createFormHandler = (data, mode) => {
    setItem(data);
    setMode(mode || 'create');
    setIsFormModal(true);
  }
  const closeFormModalHandler = () => {


    setIsFormModal(false);
  }

  useEffect(() => {
    console.log('[useEffect]',isDeleteTransactionCollection,props.DeleteTransactionState.status);
  
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
  }, [isTransactionsCollection,isCreateTransactionCollection,isUpdateTransactionCollection,isDeleteTransactionCollection]);
  useEffect(() => {
   const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
   setDateFrom(dates.from);
   setDateTo(dates.to);
   console.log('[dates]',dates);
    props.listProducts();
    props.listTransactions({from : dates.from,to:dates.to});
  }, []);

  if(props.products && props.products.status === ACTION_STATUSES.SUCCEED) {
    productList = [];
    productList = [...props.products.data];
    props.products.data.forEach(item => {
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
    props.listTransactions({from : dates.from,to:dates.to});
  }
  console.log('[props.transactions]', props.transactions);
  if (isTransactionsCollection && props.transactions && props.transactions.status === ACTION_STATUSES.SUCCEED) {
    grandTotal = 0.0;
    let source = props.transactions.data;
    if (source && source.length) {
      source  = DataHandler.mapData(source);
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
    console.log('[delete transaction id]',id);
    props.DeleteTransaction(id);
  }
  const createTransactionHandler = (payload,mode) => {
    console.log('[Order Date Create Transaction Handler]',payload,mode);
    console.log('[Order Date]',moment(payload.orderedDt));
    console.log('[Order Date2]',moment(payload.orderedDt).format('YYYY-MM-DD'));
    console.log('[Order Date3]',moment(payload.orderedDt).utc().format('YYYY-MM-DD'));
    console.log('[Order Date4]',moment(new Date(payload.orderedDt)).utc().format('YYYY-MM-DD'));
    const params = {
      created_at : new Date(),
      
      ordered_at : moment(payload.orderedDt).format('YYYY-MM-DD 00:00:00'),
      order_number : payload.orderNumber,
      description : payload.description,
      category: payload.category.name,
      item : payload.item,
      size : payload.size,
      dimension : payload.dimension,
      qty : payload.qty,
      qty_uom : payload.uom,
      unit_piece : payload.unitPiece,
      total_pcs : payload.totalPcs, 
      unit_price : payload.unitPrice,
      total_price : payload.totalPrice,
     price_per_pcs : payload.pricePerPcs,
     vendor: payload.vendorName,
     status : payload.statusName,
    
     expected_delivery_at : payload.expectedDeliveryDt,
      payment_method : payload.payment,
      payment_info : payload.paymentInfo,
      payment_transaction_at : payload.paymentDt,
      grand_total : payload.grandTotal
    };
    if(mode === 'create') {
      props.CreateTransaction(params);
    
    } else if (mode === 'edit') {
      params.id = payload.id;
      props.UpdateTransaction(params);
    }
    setIsFormModal(false);
    

    

  }
  console.log('[Is Create Transaction Collection]',props.CreateTransactionState);
  if (isCreateTransactionCollection && props.CreateTransactionState && props.CreateTransactionState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateTransactionCollection(false);
    props.listTransactions({from : dateFrom,to:dateTo});
 
  }
  if (isUpdateTransactionCollection && props.UpdateTransactionState && props.UpdateTransactionState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateTransactionCollection(false);
    props.listTransactions({from : dateFrom,to:dateTo});
  
  }
  console.log('[isDeleteTransaction]',isDeleteTransactionCollection,props.DeleteTransactionState);
  if (isDeleteTransactionCollection && props.DeleteTransactionState && props.DeleteTransactionState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteTransactionCollection(false);
    props.listTransactions({from : dateFrom,to:dateTo});
  
  }
  
  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]',keyword);
    if(!keyword) {
      setDataSource([...originalSource]);
      grandTotal = 0.0;
      const grands = [...originalSource].map(map => map.grand_total);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
    } else {
    const temp = [...originalSource];
    console.log('[Keyword 1]',temp);
    const found = temp.filter( data => data.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    || data.order_number.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    || data.payment_info.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    );
    console.log('[Keyword 2]',found);
    grandTotal = 0.0;
    const grands = found.map(map => map.grand_total);
    grands.forEach(g => {
      grandTotal += parseFloat(g) || 0.00;
    });
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



  return (
    <React.Fragment>
      <Grid container  style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Grid container  justifyContent="space-between">
          <div>
          <Typography variant="h6">Supply Order Transaction</Typography>
          </div>
          <div>
          <FilterTable filterRecordHandler={filterRecordHandler} filterByDateHandler={filterByDateHandler}/>
          </div>
        </Grid>
        <Grid container justifyContent="space-between" style={{ paddingBottom: 12,paddingTop:12 }}>
          <div style={{display:'inline-flex',gap:10}}>
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
          <Typography variant="h5">{`GRAND TOTAL: $${parseFloat(grandTotal|| 0.00).toFixed(2)}`} </Typography>
     
        </Grid>
        <Grid item xs={12}>

          <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
        </Grid>
      </Grid>
      {isFormModal &&
        <TransactionForm productList={productList} createTransactionHandler={createTransactionHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  products: productListStateSelector(store),
  transactions: transactionListStateSelector(store),
  CreateTransactionState : transactionCreateStateSelector(store),
  UpdateTransactionState : transactionUpdateStateSelector(store),
  DeleteTransactionState : transactionDeleteStateSelector(store),
  

});

const mapDispatchToProps = dispatch => ({
  listProducts: (data) => dispatch(attemptToFetchProduct(data)),
  resetListProducts: () => dispatch(resetFetchProductState()),
  listTransactions: (data) => dispatch(attemptToFetchTransaction(data)),
  resetlistTransactions: () => dispatch(resetFetchTransactionState()),
  CreateTransaction : (data) => dispatch(attemptToCreateTransaction(data)),
  resetCreateTransaction : () => dispatch(resetCreateTransactionState()),
  UpdateTransaction : (data) => dispatch(attemptToUpdateTransaction(data)),
  resetUpdateTransaction : () => dispatch(resetUpdateTransactionState()),
  DeleteTransaction : (data) => dispatch(attemptToDeleteTransaction(data)),
  resetDeleteTransaction : () => dispatch(resetDeleteTransactionState())


});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);

