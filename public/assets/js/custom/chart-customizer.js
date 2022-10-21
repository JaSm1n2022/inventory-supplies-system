// Chart function

function elemId(val) {
    return document.getElementById(val);
}

function chart() {
    var vals1 = [31, 40, 28, 51, 42, 109, 100];
    var vals2 = [35, 40, 69, 51, 42, 30, 50];
    var vals3 = [23, 85, 69, 563, 42, 23, 100];

    function graph(selector, opt) { 
        var options = {
            series: [{
                    name: 'Month',
                    data: opt
                },
                {
                    name: 'Week',
                    data: [11, 32, 45, 32, 34, 52, 41]
                }
            ],
            chart: {
                height: 268,
                parentHeightOffset: 0,
                type: 'area',
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false | '<img src="/static/icons/reset.png" width="20">',
                    }
                }
            },
            title: {
                text: 'ALERT TRENDING TODAY',
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '16px',
                    fontWeight: '400',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#7b7b7b'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
            legend: {
                show: true,
                floating: false,
                fontSize: '16px',
                position: 'bottom',
                itemMargin: {
                    horizontal: 5,
                    vertical: 15
                },
            }
        };
        var chart = new ApexCharts(selector, options);
        chart.render();
    }
    if (document.querySelectorAll("#chart").length > 0 && document.querySelectorAll("#chart1").length > 0 && document.querySelectorAll("#chart2").length > 0) {
        graph(elemId("chart"), vals1);
        graph(elemId("chart1"), vals2);
        graph(elemId("chart2"), vals3);
    }

}
chart();