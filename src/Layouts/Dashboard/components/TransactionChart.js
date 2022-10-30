import Chart from 'react-apexcharts';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { PATIENT_DASHBOARD_CATEGORY } from '../../../utils/constants';
const optionLabels = ['OFFICE','CLIENTS/PATIENTS'];
const TransactionChart = (props) => {
  const [options] = useState({
    labels:  [...optionLabels]
  });
  const [series,setSeries] = useState([50,50]);

useEffect(() => {
  console.log('[Props series]',props.series);
    setSeries([...props.series] || [50,50]);
},[props.series]);
 return (
          <Chart id="transaction" options={options} series={series} type="pie" width={400} height={300} />
        )
 }
    
  export default TransactionChart;