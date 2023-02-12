import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { attemptToFetchTransaction, resetFetchTransactionState } from "../../../../store/actions/transactionAction";
import { transactionListStateSelector } from "../../../../store/selectors/transactionSelector";
import { ACTION_STATUSES, DCH_YEARS } from "../../../../utils/constants";
import ReportChart from "../Chart/ReportChart";

let numberOfMonth = 0;
let numberOfProcess = 1;
let data = [];
let grandTotal = 0.0;

const InvoiceReport = (props) => {

    const [isProcessCollection, setIsProcessCollection] = useState(true);
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        data = [];
        numberOfProcess = 0;
        numberOfMonth = DCH_YEARS.length;
        console.log('Year to call1', numberOfMonth, DCH_YEARS[numberOfProcess]);

        props.listTransactions({ from: DCH_YEARS[numberOfProcess].from, to: DCH_YEARS[numberOfProcess].to });
        //start with 2022

    }, []);
    useEffect(() => {
        if (!isProcessCollection && props.transactions.status === ACTION_STATUSES.SUCCEED) {


            const record = [...props.transactions.data];

            console.log('[record]', record[0], record.length, DCH_YEARS[numberOfProcess])

            data.push({ numberOfRecord: record.length, data: [...record], query: DCH_YEARS[numberOfProcess] });
            numberOfProcess += 1;
            props.resetlistTransactions();

            if (numberOfProcess < numberOfMonth) {
                setIsProcessCollection(true);
                console.log('Year to call2', DCH_YEARS[numberOfProcess]);
                props.listTransactions({ from: DCH_YEARS[numberOfProcess].from, to: DCH_YEARS[numberOfProcess].to });
            } else {
                console.log('[Final Data]', data);
                grandTotal = 0.0;
                const recs = [];
                for (const d of data) {
                    const amts = d.data.map(map => map.grand_total);
                    let grand = 0.0;
                    amts.forEach(a => {
                        grand += parseFloat(a || 0.0);
                    })
                    grandTotal += grand;
                    recs.push({
                        range: `${d.query.from} to ${d.query.to}`,
                        cnt: d.data.length,

                        total: parseFloat(grand | 0.0).toFixed(2)
                    })
                }
                setSummary(recs);
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProcessCollection]);


    if (isProcessCollection && props.transactions && props.transactions.status === ACTION_STATUSES.SUCCEED) {

        setIsProcessCollection(false);



    }



    return (
        <React.Fragment>
            <Grid justifyContent="space-between" container style={{ padding: 10 }}>
                <Typography variant="h5">Supplies Purchased Report</Typography>
                <Box style={{ padding: 2, background: '#ebedeb', border: '1px solid #ebedeb' }}>
                    <Typography variant="h5" color="primary">{`$${new Intl.NumberFormat('en-IN', {}).format(parseFloat(grandTotal))}`}</Typography>
                </Box>
            </Grid>
            <Grid justifyContent="space-between" container style={{ padding: 10 }}>
                <Typography variant="body1" color="textSecondary">*** This report is based on all purchased products (office/medical/Incontinence/etc) ***</Typography>
            </Grid>
            <Table sx={{ width: 600 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date Range</TableCell>
                        <TableCell>Number Of Records/Items</TableCell>
                        <TableCell>Total Amount</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {summary && summary.length ?
                        summary.map(m => {
                            return (
                                <TableRow key={m.range}>
                                    <TableCell component="th" scope="row">
                                        {m.range}
                                    </TableCell>
                                    <TableCell>{m.cnt}</TableCell>

                                    <TableCell>{`$${m.total}`}</TableCell>

                                </TableRow>
                            )
                        })
                        : null}
                </TableBody>
            </Table>
            <div style={{ paddingTop: 10 }}>
                <Typography variant="h6">Graph Presentation</Typography>
                <ReportChart data={summary} />
            </div>

        </React.Fragment>
    )
}
const mapStateToProps = store => ({

    transactions: transactionListStateSelector(store),


});

const mapDispatchToProps = dispatch => ({
    listTransactions: (data) => dispatch(attemptToFetchTransaction(data)),
    resetlistTransactions: () => dispatch(resetFetchTransactionState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceReport);

