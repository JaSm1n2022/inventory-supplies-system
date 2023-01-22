import Chart from 'react-apexcharts';
import React, { useState } from 'react';
import { useEffect } from 'react';
const ProviderChart = (props) => {
  const [options] = useState({
    labels:  [...props.labels]
  });
  const [series,setSeries] = useState([50,50,50,50]);

useEffect(() => {
  console.log('[Props series]',props.series);
    setSeries([...props.series]);
},[props.series]);
 return (
          <Chart id="provider" options={options} series={series} type="pie" width={420} height={420} />
        )
 }
    
  export default ProviderChart;