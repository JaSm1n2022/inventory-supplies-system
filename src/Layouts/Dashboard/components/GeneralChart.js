import Chart from 'react-apexcharts';
import React, { useState } from 'react';
import { useEffect } from 'react';

const GeneralChart = (props) => {
  const [options] = useState({
    labels:  [...props.labels]
  });
  const [series,setSeries] = useState([50,50]);

useEffect(() => {
  console.log('[Props series]',props.series);
    setSeries([...props.series]);
},[props.series]);
 return (
          <Chart id="provider" options={options} series={series} type="pie" width={400} height={300} />
        )
 }
    
  export default GeneralChart;