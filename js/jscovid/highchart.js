const SearchInput2 = document.getElementById('search-input');

function highchartjs(arrayday, arraycf, arraydea){

    const chart = Highcharts.chart('highchart', {
        chart: {
            type: 'column'
        },


        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: arrayday,
            crosshair: true
        },
        yAxis: {
            min: 0 ,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y: .0,0f} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,

            },
            bar: {
                dataLabels: {
                    enabled: true
                }
            }

        },
        series: [{
            name: 'Ca nhiễm ',
            data: arraycf,

        }, {
            name: 'Ca tử vong ',
            data: arraydea,

        }]
    });
    
};



//Hàm tìm kiếm chart
SearchInput2.addEventListener('change', async (e) => {

    const resp2 =await fetch (`https://api.covid19api.com/total/country/${e.target.value}`)
    const data2 = await resp2.json();


        let cn = "";
        let ngay =  "";
        let tv ="";

        data2.forEach((covid) => {
            
            cn += covid.Confirmed + '_';
            tv += covid.Deaths + '_';
            ngay += moment(covid.Date).format('DD/MM/YYYY') + '_';
        });
        const arraycn = cn.split('_').map(Number);
        const arraytv = tv.split('_').map(Number);
        const arrayngay = ngay.split('_');

        highchartjs(arrayngay.slice(arrayngay.length - 8), arraycn.slice(arraycn.length - 8), arraytv.slice(arraytv.length - 8));
});



async function chartCovidCountryDf (){
        const resp =await fetch ('https://api.covid19api.com/total/country/vietnam')
        const data = await resp.json();

      

        let cn = "";
        let ngay =  "";
        let tv ="";

        data.forEach((covid) => {
            cn += covid.Confirmed + '_';
            tv += covid.Deaths + '_';
            ngay += moment(covid.Date).format('DD/MM/YYYY') + '_';
            
        });
       
        
        const arraycn = cn.split('_').map(Number);
        const arraytv = tv.split('_').map(Number);
        const arrayngay = ngay.split('_');
        highchartjs(arrayngay.slice(arrayngay.length - 8), arraycn.slice(arraycn.length - 8), arraytv.slice(arraytv.length - 8))
};

async function chartCovidWorld (){
    const resp =await fetch ('https://api.covid19api.com/summary');
    const data = await resp.json();


    let quocgia = "";
    let canhiem = "";


    data.Countries.forEach((covid) => {
        quocgia += covid.Country + '_';
        canhiem += covid.TotalConfirmed + '_';

    });
    let arrayquocgia = quocgia.split('_');
    let arraycanhiem = canhiem.split('_').map(Number);


    Highcharts.chart('highchartworld', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Biểu đồ ca lây nhiễm trên toàn thế giới'
        },
        subtitle: {
            text: 'Github: <a href="https://github.com/ExpDev07/coronavirus-tracker-api">coronavirus-tracker-api</a>'
        },
        xAxis: {
            categories: arrayquocgia,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' Ca'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: arraycanhiem
        }]
    });


};

chartCovidWorld();
chartCovidCountryDf();



