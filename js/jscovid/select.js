const Default1 = "--";

function dataTable(data){
    let covidselect="";
    data.locations.forEach((covid) => {
        const CounTry = covid.country;
        const Province = covid.province;
        const Confirmed =new Intl.NumberFormat().format(covid.latest.confirmed);
        const Deaths =new Intl.NumberFormat().format(covid.latest.deaths);
        const Update = (covid.last_updated).substring(0,10);
        const ratio =
        ((Number(covid.latest.deaths)/Number(covid.latest.confirmed))*100)
        .toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2} );
        covidselect +=`
        <tr>
            <td id="quocgia">${CounTry}</td>
            <td>${Province || Default1}</td>
            <td id="tong_canhiem">${Confirmed}</td>
            <td id="tong_tuvong">${Deaths}</td>
            <td>${Update}</td>
            <td>${ratio || Default1} %</td>
        </tr>`;
    });
    $('#data-covid').html(covidselect);

};

function dataCard(data){
    let covidselect="";
    data.Countries.forEach((covid) => {
        
        const CounTry = covid.Country;
        const CounTry_Code = covid.CountryCode;
        const Confirmed =new Intl.NumberFormat().format(covid.TotalConfirmed);
        const Deaths =new Intl.NumberFormat().format(covid.TotalDeaths);
        const NewConfirmed =new Intl.NumberFormat().format(covid.NewConfirmed);
        const NewDeaths =new Intl.NumberFormat().format(covid.NewDeaths);
        const Recovered =new Intl.NumberFormat().format(covid.TotalRecovered);
        const Update = moment(covid.Date).format('DD/MM/YYYY');
        
        covidselect +=`
        <div class="col-lg-3 col-md-6 col-sm-6" >
                <div class="country">
                    <div class="country-card">
                       
                        <div class="data-card">
                        <div class="country-flag"><div class="flag"><img src="https://www.countryflags.io/${CounTry_Code || 'us'}/flat/64.png"></div><h3>${CounTry}</h3></div>
                            <div class="row-data">
                                <div class="colum-data">
                                    <div class="name-value">Ca nhi???m</div>
                                    <div class="value" id="tong_canhiem">${Confirmed}</div>
                                </div>
                                <div class="colum-data">
                                    <div class="name-value">Ca nhi????m m????i</div>
                                    <div class="value" id="tong_canhiem">+${NewConfirmed}</div>
                                </div>
                            </div>
                            <div class="row-data">
                                <div class="colum-data">
                                    <div class="name-value">T???? vong</div>
                                    <div class="value"><span id="tong_tuvong">${Deaths}</span></div>
                                </div>
                                <div class="colum-data">
                                    <div class="name-value">T???? vong m????i</div>
                                    <div class="value" ><span id="tong_tuvong">+${NewDeaths}</span></div>
                                </div>
                            </div>
                            <div class="name-value">H???i ph???c: <div id="tong_phuchoi">${Recovered}</div></div>
                            <div><p class="card-text"><small class="text-muted">??a?? c????p nh????p ${Update}</small></p></div></li>
                        </div>
                        
                    </div>
                </div>
            </div>`;
    });
    $('#world').html(covidselect);  
};




async function SelectCf(obj){
    const resp =await fetch (`https://coronavirus-tracker-api.herokuapp.com/v2/locations?country=${$("#quocgia").text()}`)
    .catch($('#data-covid').text('Xin ha??y ??????i 1 chu??t'));
    const data = await resp.json();
   
    var value = obj.value;
    if(value == 1){
        data.locations.sort(function(a, b){return b.latest.confirmed - a.latest.confirmed});
        dataTable(data);
    }
    else if(value == 2){
        data.locations.sort(function(a, b){return a.latest.confirmed - b.latest.confirmed});
        dataTable(data);
    }
    else{
        dataTable(data);
    }
};
async function SelectDea(obj){
    const resp =await fetch (`https://coronavirus-tracker-api.herokuapp.com/v2/locations?country=${$("#quocgia").text()}`)
    .catch($('#data-covid').text('Xin ha??y ??????i 1 chu??t'));
    const data = await resp.json();

   
    var value = obj.value;
    if(value == 1){
        data.locations.sort(function(a, b){return b.latest.deaths - a.latest.deaths});
        dataTable(data);
    }
    else if(value == 2){
        data.locations.sort(function(a, b){return a.latest.deaths - b.latest.deaths});
        dataTable(data);
    }
    else{
        dataTable(data);
    }
};
async function SelectConfirmed(obj){
    const resp =await fetch ('https://api.covid19api.com/summary')
    .catch($('#world').text('Xin ha??y ??????i 1 chu??t'));
    const data = await resp.json();
    let covidselect="";
    var value = obj.value;
    if(value == 1){
        data.Countries.sort(function(a, b){return b.TotalConfirmed - a.TotalConfirmed});
        dataCard(data);
    }
    else if(value == 2){
        data.Countries.sort(function(a, b){return a.TotalDeaths - b.TotalDeaths});
        dataCard(data);
    }
    else{
        $('#world').text('Xin vui l??ng ch???n l???i')
    }
};
async function SelectDeaths(obj){
    const resp =await fetch ('https://api.covid19api.com/summary')
    .catch($('#world').text('Xin ha??y ??????i 1 chu??t'));
    const data = await resp.json();
    let covidselect="";
    var value = obj.value;
    if(value == 1){
        data.Countries.sort(function(a, b){return b.TotalDeaths - a.TotalDeaths});
        dataCard(data);
    }
    else if(value == 2){
        data.Countries.sort(function(a, b){return a.TotalDeaths - b.TotalDeaths});
        dataCard(data);
    }
    else{
        $('#world').text('Xin vui l??ng ch???n l???i')
    }
   
};
