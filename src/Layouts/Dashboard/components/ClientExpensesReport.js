
import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import Helper from "../../../utils/helper";
import ClientPieChart from "./ClientPieChart";


 
class ClientExpensesReport extends React.Component {

    render() {
        const {patientDashboard,numberActive,numberInactive,clientExpensesAmt,dateFrom,dateTo} = this.props;
        
        
        console.log('[Details]',patientDashboard);
        return (
            <React.Fragment>
                 <Grid container style={{ width: '1200px', height: '800px', paddingLeft: 20 }}>
                     <Grid item xs={12} align="center" style={{paddingTop:40}}>
                     <Typography variant="h5">{`Client Expenses Report From ${dateFrom} To ${dateTo}`}</Typography>
                     </Grid>
                     <Grid item xs={12} align="center">
                         <div style={{display:'inline-flex',gap:30}}>
                     <Typography variant="body">Active Patients: {numberActive}</Typography>
                     <Typography variant="body" style={{color:'red',fontWeight:'bold'}}>InActive Patients: {numberInactive}</Typography>
                     </div>
                     </Grid>
                     <Grid item xs={12} align="center" style={{paddingBottom:60}}>
                     <Typography variant="h6" style={{color:'blue',fontWeight:'bold'}}>Grand Total : {clientExpensesAmt} <Typography variant="bold2" style={{color:'gray',fontWeight:'bold'}}>&nbsp;(excluding tax & shipping)</Typography></Typography>
                     </Grid>
                     
            {patientDashboard.length && patientDashboard.map((map,index) => {
                return (
                  <Grid item xs={4}>
                    <div align="center">
                        <div style={{display:'inline-flex',gap:4}}>
                          <Avatar sx={{ width: 24, height: 24 }}>{index + 1}</Avatar>
                        {`${map.name.toUpperCase()} - $${parseFloat(map.estimatedAmt).toFixed(2)}`}
                        </div>

                      <Typography variant="body2">{map.status && map.status === 'Inactive' ? `(INACTIVE SINCE ${map.eoc})` : `(ACTIVE SINCE ${map.soc})`}</Typography>
                      <Typography variant="body2" style={{ color: 'blue' }}>{map.status && map.status === 'Inactive' ? `Days in Hospice : ${Helper.calculateDaysInStorage(new Date(map.soc), new Date(map.eoc))})` : `Days in Hospice  : ${Helper.calculateDaysInStorage(new Date(map.soc))}`}</Typography>

                      {map.cna &&
                        <Typography variant="body2" style={{ color: 'green' }}>{`CNA : ${map.cna.toUpperCase()}`}</Typography>
                      }
                    </div>
                    <div>
                      <ClientPieChart series={map.series} />
                    </div>
                    {index !== 0 && index <= 14 && index % 14 === 0 ?
                        <div style={{paddingBottom:130}}></div>
                     : index !== 0 && index >= 29 && index % 29 === 0 ? 
                     <div style={{paddingBottom:200}}></div>
                     : null
                    }
                  </Grid>
                )
              })}
              </Grid>
              </React.Fragment>

        )
    }
}
export default ClientExpensesReport;