import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import SearchLookupTextField from "../../../Common/components/TextField/SearchLookupTextField";


const FilterTable = (props) => {
    const [keywordValue, setKeywordValue] = useState('');
    
   
    const inputHandler = ({ target }) => {

        switch (target.name) {
            case "keywordValue":
                setKeywordValue(target.value);
                return;
            default:
                return;
        }

    };
    
    const onPressEnterKeyHandler = () => {
        props.filterRecordHandler(keywordValue);

    }

   
    const clearFilterHandler = () => {
        setKeywordValue('');
        props.filterRecordHandler('');
    }
    const applyFilterHandler = () => {
    
        props.filterRecordHandler(keywordValue);
    }
    return (
        <React.Fragment>
            <Grid container direction="row" spacing={1}>
            <div style={{ display: 'flex', gap: 10 }}>
            <div style={{width:300}}>
                    <SearchLookupTextField
                        background={"white"}
                        onChange={inputHandler}
                        placeholder={"Search Patient"}
                        label={"Search Patient"}
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