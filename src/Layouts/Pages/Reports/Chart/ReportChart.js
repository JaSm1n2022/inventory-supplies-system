import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Helper from "../../../../utils/helper";

const ReportChart = (props) => {

  const [options, setOptionss] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ['Oct 2022', 'Nov 2022', 'Dec 2022', 'Jan 2023', 'Feb 2023']
      }
    }
  });
  const [series, setSeries] = useState({
    series: [
      {
        name: "series-1",
        data: [4583, 8346, 4977, 5269, 9032]
      }
    ]
  });

  useEffect(() => {
    const summary = props.data;
    const categories = [];
    const values = [];
    for (const rep of summary) {
      categories.push(Helper.formatReportDateAxisCategory(rep.range));
      values.push(rep.total);

    }
    const tempOptions = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories
        }
      }
    };
    const tempSeries = {
      series: [
        {
          name: "series-1",
          data: values
        }
      ]
    }
    setSeries(tempSeries);
    setOptionss(tempOptions);

  }, [props]);

  return (
    <React.Fragment>

      <Chart
        options={options.options}
        series={series.series}
        type="bar"
        width="500"
      />

    </React.Fragment>
  );

}
export default ReportChart;