import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchLookupTextField from "../../../Common/components/TextField/SearchLookupTextField";
import DateTypeAutoComplete from "../../../Common/components/AutoComplete/DateTypeAutoComplete";
import DateRangeModal from "../../../Common/components/Modal/DateRangeModal";
import { DATE_TYPE_SELECTION, DEFAULT_ITEM } from "../../../utils/constants";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Helper from "../../../utils/helper";
const INVOICE_KEYWORDS = [
'Invoice Number',
'Payment Method'
];
let searchKeywordTypes = [];
let dateOptions = [];
let lastDateType = '';
DATE_TYPE_SELECTION.forEach(c => { dateOptions.push({ ...c, category: 'date' }) });


const FilterTable = (props) => {
    const [keywordValue, setKeywordValue] = useState('');
    const [dateSelected,setDateSelected] = useState(dateOptions.find(d => d.value === 'thisMonth'));
    const [dateFrom,setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [isDateCustom,setIsDateCustom] = useState(false);
    
    useEffect(() => {
        const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
        setDateFrom(dates.from);
        setDateTo(dates.to);
      }, []);

    const inputHandler = ({ target }) => {

        switch (target.name) {
            case "keywordValue":
                setKeywordValue(target.value);
                return;
            default:
                return;
        }

    };
    const autoCompleteInputHander = (item) => {
		if (item.category === 'date') {
			let data = {
				from: '',
				to: ''
			};
			if (item.value !== 'custom') {
				data = Helper.formatDateRangeByCriteriaV2(item.value);
				console.log('[item data]', data);
			} else {
                data = Helper.formatDateRangeByCriteriaV2('last7Days');
            }
            setDateFrom(data.from);
            setDateTo(data.to);
			setIsDateCustom(item.value === 'custom' || item.dateRange ? true : false);
			setDateSelected(item);
            if (item.value !== 'custom') {
            props.filterByDateHandler({from : data.from,to:data.to});
            }
			
    }

	}
    
    const onPressEnterKeyHandler = () => {
    props.filterRecordHandler(keywordValue);        

    }

    const onClearHandler = (name) => {

		if (name === 'dateType') {
			lastDateType = '';
			setDateSelected(DEFAULT_ITEM);
            setDateFrom('');
            setDateTo('');

		} 

	}

	const closeDateModalHandler = () => {

		setIsDateCustom(false);
		setDateSelected(dateOptions.find(e => e.value === lastDateType));
	
	}
	const addDateHandler = (from, to) => {

		const dt = `${moment(from || new Date()).format('YYYY-MM-DD')} - ${moment(to || new Date()).format('YYYY-MM-DD')}`;

		const options = dateOptions.filter(f => !f.dateRange);
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
		dateOptions = options;
		setIsDateCustom(false);
		setDateSelected(etaValue);
        const _sfrom = from ? moment(new Date(from)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD');
        const _sTo = to ? moment(new Date(to)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD');
		setDateFrom(_sfrom);
        setDateTo(_sTo);
        props.filterByDateHandler({from : _sfrom,to:_sTo});
	}
    const clearFilterHandler = () => {
        setKeywordValue('');
        
        setDateSelected(DEFAULT_ITEM);
    }
    const applyFilterHandler = () => {
       
        props.filterRecordHandler(keywordValue);
        

    }
    console.log('[Dates]',dateOptions);
    return (
        <React.Fragment>
            <Grid container style={{paddingTop:10}}>
            <div style={{ display: 'flex', gap: 10 }}>
            <div style={{width:300}}>
            <DateTypeAutoComplete
					value={dateSelected || DEFAULT_ITEM}
					name="dateType"

					placeholder={dateSelected.name ? `Date : ${dateFrom} to ${dateTo}` : 'Date'}
					onSelectHandler={autoCompleteInputHander}
					onClearHandler={onClearHandler}
					options={dateOptions || [DEFAULT_ITEM]}>

				</DateTypeAutoComplete>
                {isDateCustom &&
					<DateRangeModal description={`Created`} dateFrom={dateFrom} dateTo={dateTo} isOpen={isDateCustom} noHandler={closeDateModalHandler} yesHandler={addDateHandler} />
				}
           </div>
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
                        <Button variant="contained" color="primary" style={{ fontSize: 14 }} onClick={() => applyFilterHandler()}>Apply</Button>
                        <Button variant="contained" color="secondary" style={{ fontSize: 14 }} onClick={() => clearFilterHandler()}>Clear</Button>
                    </div>
            </Grid>

        </React.Fragment>
    )
}
export default FilterTable;