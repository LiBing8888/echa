let echarts = require('@/assets/js/echarts.min.js')
export const echarts_5 = (data:any) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart5'));
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#dddc6b'
                }
            }
        },
        legend: {
            top: '10%',
            data: ['波高', '波周期'],
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12',
            }
        },
        grid: {
            left: '10',
            top: '80',
            right: '20',
            bottom: '10',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                },
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.2)'
                }

            },

            data: ['00:01', '01:01', '02:01', '03:01', '04:01', '05:01', '06:01', '07:01', '08:01', '09:01', '10:01', '11:01', '12:01', '13:01']

        }, {

            axisPointer: { show: false },
            axisLine: { show: false },
            position: 'bottom',
            offset: 20,



        }],

        yAxis: [{
            name: 'Hs (m)',
            type: 'value',
            nameTextStyle: {
                color: '#ACB0C7'
            },
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#FFAD26',
                    fontSize: 12,
                },
            },

            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            }
        },
        {
            name: 'Tp (s)',
            type: 'value',
            nameTextStyle: {
                color: '#ACB0C7'
            },
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#00A2FF',
                    fontSize: 12,
                },
            },

            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            }
        }],
        series: [

            {
                name: '波高',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {

                    normal: {
                        color: '#FFAD26',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255, 173, 38, 0.5)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(255, 173, 38, 0.4)'
                        },
                        {
                            offset: 0.5,
                            color: 'rgba(255, 173, 38, 0.1)'
                        }
                        ], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#FFAD26',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: data.data1

            },
            {
                name: '波周期',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                yAxisIndex: 1,
                showSymbol: false,
                lineStyle: {

                    normal: {
                        color: '#00A2FF',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 162, 255, 0.5)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 162, 255, 0.4)'
                        },
                        {
                            offset: 0.5,
                            color: 'rgba(0, 162, 255, 0.1)'
                        }
                        ], false),
                        shadowColor: 'rgba(0,0,0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#00A2FF',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: data.data2

            },

        ]

    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}