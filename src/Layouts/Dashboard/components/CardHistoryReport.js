
import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import Helper from "../../../utils/helper";
import CardTransaction from "./CardTransaction";
import ClientPieChart from "./ClientPieChart";


class CardHistoryReport extends React.Component {

  render() {
      const {details,dateFrom, dateTo} = this.props;
      
      
      return (
          <React.Fragment>
               <Grid container style={{ width: '1200px', height: '800px', paddingLeft: 20 }}>
                   <CardTransaction details={details} dateFrom={dateFrom} dateTo={dateTo} />
            </Grid>
            </React.Fragment>

      )
  }
}
export default CardHistoryReport;