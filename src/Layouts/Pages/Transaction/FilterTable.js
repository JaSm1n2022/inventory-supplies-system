import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchLookupTextField from "../../../Common/components/TextField/SearchLookupTextField";
import { DATE_TYPE_SELECTION, DEFAULT_ITEM } from "../../../utils/constants";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
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


    }

    const onClearHandler = (name) => {

		if (name === 'invoiceDtType') {
			lastInvoiceDtType = '';
			setInvoiceDateSelected(DEFAULT_ITEM);
            setInvoiceFrom('');
            setInvoiceTo('');

		} 

	}

	const closeInvoiceDateModalHandler = () => {

		setIsInvoiceDtCustom(false);
		setInvoiceDateSelected(invoiceDateOptions.find(e => e.value === lastInvoiceDtType));
	
	}
	const addInvoiceDateHandler = (from, to) => {

		const dt = `${moment(from || new Date()).format('YYYY-MM-DD')} - ${moment(to || new Date()).format('YYYY-MM-DD')}`;

		const options = invoiceDateOptions.filter(f => !f.dateRange);
		const etaValue = {

			name: dt,
			value: dt,
			dateRange: dt,
			from,
			to,
			id: uuidv4(),
			label: dt,
			category: 'etdDateType',
			disabled: true
		};
		options.push(etaValue);
		invoiceDateOptions = options;
		setIsInvoiceDtCustom(false);
		setInvoiceDateSelected(etaValue);
		setInvoiceFrom(from ? moment(new Date(from)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'));
        setInvoiceTo(to ? moment(new Date(to)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'));

	}
    const clearFilterHandler = () => {
        setKeywordValue('');
        setKeywordType(DEFAULT_ITEM);
        setInvoiceDateSelected(DEFAULT_ITEM);
    }
    const applyFilterHandler = () => {
        console.log('Data Selected',invoiceDateSelected);
        console.log('Date Range',invoiceFrom,invoiceTo);
        console.log('Keyword',keywordValue);
        console.log('Keyword Type',keywordType);
        props.filterRecordHandler({
            from : `${invoiceFrom} 00:00:00`,
            to : `${invoiceTo} 23:59:59`,
            keywordValue,
            keywordType
        });
    }
    return (
        <React.Fragment>
            <Grid container  spacing={24}>
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
           </div>  <div style={{width:300}}>
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
                        <Button variant="contained" color="primary" style={{ fontSize: 14 }} onClick={() => applyFilterHandler()}>Apply</Button>
                        <Button variant="contained" color="secondary" style={{ fontSize: 14 }} onClick={() => clearFilterHandler()}>Clear</Button>
                    </div>
            </Grid>

        </React.Fragment>
    )
}
export default FilterTable;