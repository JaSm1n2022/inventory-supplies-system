import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SingleWithClearAutoComplete from "../../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import RegularSelect from "../../../../Common/components/Select/RegularSelect";


import { attemptToFetchDistribution, resetFetchDistributionState } from "../../../../store/actions/distributionAction";
import { distributionListStateSelector } from "../../../../store/selectors/distributionSelector";
import { ACTION_STATUSES, DCH_YEARS } from "../../../../utils/constants";
let isDoneYear = false;
let numberOfMonth = 0;
let numberOfProcess = 1;
let data = [];
const ClientDistribution = (props) => {

    const [isProcessCollection, setIsProcessCollection] = useState(true);
    useEffect(() => {
        data = [];
        numberOfProcess = 0;
        numberOfMonth = DCH_YEARS.length;
        console.log('Year to call1', numberOfMonth,DCH_YEARS[numberOfProcess]);
        props.listDistributions({ from: DCH_YEARS[numberOfProcess].from, to: DCH_YEARS[numberOfProcess].to });
        //start with 2022

    }, []);
    useEffect(() => {
        if (!isProcessCollection && props.distributions.status === ACTION_STATUSES.SUCCEED) {
            const record = [...props.distributions.data];
            console.log('[record]',record[0],record.length,DCH_YEARS[numberOfProcess])
            
            data.push({ numberOfRecord: record.length, data: [...record],query:DCH_YEARS[numberOfProcess] });
            numberOfProcess += 1;
            props.resetListDistributions();
            
            if (numberOfProcess < numberOfMonth) {
                setIsProcessCollection(true);
                console.log('Year to call2', DCH_YEARS[numberOfProcess]);
                props.listDistributions({ from: DCH_YEARS[numberOfProcess].from, to: DCH_YEARS[numberOfProcess].to });
            } else {
                console.log('[Final Data]',data);
            }

        }
    }, [isProcessCollection]);


    if (isProcessCollection && props.distributions && props.distributions.status === ACTION_STATUSES.SUCCEED) {

        setIsProcessCollection(false);



    }
    console.log('[report data]', data);
    return (
        <React.Fragment>
            <Typography>Under Construction</Typography>
        </React.Fragment>
    )
}
const mapStateToProps = store => ({
    distributions: distributionListStateSelector(store),


});

const mapDispatchToProps = dispatch => ({
    listDistributions: (data) => dispatch(attemptToFetchDistribution(data)),
    resetListDistributions: () => dispatch(resetFetchDistributionState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDistribution);

