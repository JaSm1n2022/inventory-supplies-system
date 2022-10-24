import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchLookupTextField from "../../../Common/components/TextField/SearchLookupTextField";
import { DATE_TYPE_SELECTION, DEFAULT_ITEM } from "../../../utils/constants";

import Helper from "../../../utils/helper";
const INVOICE_KEYWORDS = [
'Invoice Number',
'Payment Method'
];
let searchKeywordTypes = [];
let invoiceDateOptions = [];
let lastInvoiceDtType = '';
DATE_TYPE_SELECTION.forEach(c => { invoiceDateOptions.push({ ...c, category: 'invoiceDate' }) });
INVOICE_KEYWORDS.forEach((item, i) => {
    searchKeywordTypes.push({
        id: i,
        name: item,
        value: item,
        label: item,
        category: 'keyword'
    })
})

const FilterTable = (props) => {
    const [keywordType, setKeywordType] = useState('ALL');
    const [keywordValue, setKeywordValue] = useState('');
    const [invoiceDateSelected,setInvoiceDateSelected] = useState({name:''})
    const [invoiceFrom,setInvoiceFrom] = useState('');
    const [invoiceTo, setInvoiceTo] = useState('');
    const [isInvoiceDtCustom,setIsInvoiceDtCustom] = useState(false);
    
    useEffect(() => {
        const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
        setInvoiceFrom(dates.from);
        setInvoiceTo(dates.to);
      }, []);

    const inputHandler = ({ target }) => {

        switch (target.name) {
            case "keywordType":
                setKeywordType(target.value);

                return;
            case "keywordValue":
                setKeywordValue(target.value);
                return;
            default:
                return;
        }

    };
    const autoCompleteInputHander = (item) => {
		if (item.category === 'invoiceDate') {
			let data = {
				from: '',
				to: ''
			};
			if (item.value !== 'custom') {
				data = Helper.formatDateRangeByCriteriaV2(item.value);
				console.log('[item data]', data);
			}
            setInvoiceFrom(data.from);
            setInvoiceTo(data.to);
			setIsInvoiceDtCustom(item.value === 'custom' || item.dateRange ? true : false);
			setInvoiceDateSelected(item);
			
    }

	}
    
    const onPressEnterKeyHandler = () => {
        props.filterRecordHandler(keywordValue);

    }

   
    const clearFilterHandler = () => {
        setKeywordValue('');
        setKeywordType(DEFAULT_ITEM);
        props.filterRecordHandler('');
    }
    const applyFilterHandler = () => {
    
        props.filterRecordHandler(keywordValue);
    }
    return (
        <React.Fragment>
            <Grid container direction="row" spacing={1} xs={12}>
            <div style={{ display: 'flex', gap: 10 }}>
            <div style={{width:300}}>
                    <SearchLookupTextField
                        background={"white"}
                        onChange={inputHandler}
                        placeholder={"Search Item"}
                        label={"Search Item"}
                        name={"keywordValue"}
                        onPressEnterKeyHandler={onPressEnterKeyHandler}
                        isAllowEnterKey={true}
                        value={keywordValue} />    
               </div>

                
                    <div style={{ display: 'flex', gap: 10 }}>
                        <Button variant="contained" color="primary" style={{ fontSize: 14 }} onClick={() => applyFilterHandler()}>Apply</Button>
                        <Button variant="contained" color="secondary" style={{ fontSize: 14 }} onClick={() => clearFilterHandler()}>Clear</Button>
                    </div>
                </div>
            </Grid>

        </React.Fragment>
    )
}
export default FilterTable;