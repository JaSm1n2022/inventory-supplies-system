import Chart from 'react-apexcharts';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { PATIENT_DASHBOARD_CATEGORY } from '../../../utils/constants';
const optionLabels = PATIENT_DASHBOARD_CATEGORY;
const ClientPieChart = (props) => {
  const [options] = useState({
    labels:  [...optionLabels]
  });
  const [series,setSeries] = useState([44, 55, 41, 17, 15]);

useEffect(() => {
  console.log('[Props series]',props.series);
    setSeries([...props.series] || [0, 0, 0, 0, 0]);
},[props.series]);
 return (
          <Chart options={options} series={series} type="pie" width={400} height={300} />
        )
 }
    
  export default ClientPieChart;