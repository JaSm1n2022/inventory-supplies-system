import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import React from "react";
import Hospice from '../../assets/images/logo/logo2.png';
import styles from "./distribution.module.css";
import TemplatePrint from "./TemplatePrint";

 
class ComponentToPrint extends React.Component {
  
    render() {
        const {details,general} = this.props;
        
        
        console.log('[Details]',details,general);
        return (
                <TemplatePrint general={general} details={details} />
        )
    }
}
export default ComponentToPrint;