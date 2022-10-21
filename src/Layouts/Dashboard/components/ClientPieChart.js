import Chart from 'react-apexcharts';
import React from 'react';

class ClientPieChart extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            options: {
                labels: ['BRIEF', 'UNDERPAD', 'OINTMENT', 'SHAMPOO', 'OTHERS']
              },
              series: [44, 55, 41, 17, 15]
        
            }
      }
      render() {
        return (
          <Chart options={this.state.options} series={this.state.series} type="pie" width={400} height={300} />
        )
      }
    }
  export default ClientPieChart;