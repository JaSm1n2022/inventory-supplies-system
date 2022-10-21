import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import SearchLookupTextField from "../../../Common/components/TextField/SearchLookupTextField";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import { SEARCH_KEYWORDS, SUPPLY_STATUS } from "../../../utils/constants";

let searchKeywordTypes = [];
SEARCH_KEYWORDS.forEach((item,i) => {
    searchKeywordTypes.push({
        id : i,
        name : item,
        value : item,
        label : item,
        category : 'keyword'
    })
})
let statuses = [];
SUPPLY_STATUS.forEach((item, index) => {
    statuses.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'status'

    })
});
const FilterTable = (props) => {
    const [keywordType,setKeywordType] = useState('ALL');
    const [keywordValue, setKeywordValue] = useState('');
    const [status,setStatus] = useState({name:'',value:'',label:''})
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
    const autoCompleteInputHander = (item, source) => {
        if (item.category === 'status') {
            setStatus(item);
            
        }
    }
    const onChangeInputHandler = (e) => {
        if (!e.target.value && e.target.name === 'status') {
           setStatus({name:'',value:'',label:''});
        }
    }
    const onPressEnterKeyHandler = () => {

	
	}
    return (
        <React.Fragment>
            <Grid container direction="row" spacing={1}>
                    <Grid item xs={3}>
                    <RegularSelect
							options={searchKeywordTypes}
							name={'keywordType'}
							onChange={inputHandler}
							value={keywordType}
							label={'Search Type'}
							placeholder={'Search Type'}
						/>
                    </Grid>
                    <Grid item xs={3}>
                	<SearchLookupTextField
					background={"white"}
					onChange={inputHandler}
					placeholder={"Search"}
					label={"Search"}
					name={"keywordValue"}
					onPressEnterKeyHandler={onPressEnterKeyHandler}
					isAllowEnterKey={true}
					value={keywordValue} />    </Grid>
                         
                    <Grid item xs={3}>
                       <div style={{display:'flex',gap:10}}>
                           <Button variant="contained" color="primary" style={{fontSize:14}}>Apply</Button>
                           <Button variant="contained" color="secondary" style={{fontSize:14}}>Clear</Button>
                       </div>
                    </Grid>
            </Grid>

        </React.Fragment>
    )
}
export default FilterTable;