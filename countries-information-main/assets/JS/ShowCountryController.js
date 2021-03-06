// VARIABLES
let _select = document.querySelector('#countries'),
    _section = document.querySelector('.country-main'),
    _country_selected = null,
    _latlng = null
// SELECT ONEVENT LISTENER (CHANGE)
_select.addEventListener('change', (event) => {
    _country_selected = event.target.value
    buildCountryRow(data);
})
// GET DATA FROM SERVER BY API
getData().then(() => {
    addCountryNameToSelect(data)
})
// Build country rows
function buildCountryRow(data) {
    for (const key in data) {
        if (data[key]['name'] === _country_selected) {
            _latlng = data[key]['latlng']
            _section.innerHTML = `<article class="country py-4">
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#country${key}" aria-expanded="true" aria-controls="country${key}">
                            <img src="${data[key]['flag']}" id="flag-thumbnail" class="mx-3"><span>${data[key]["name"]}</span
                        </button>
                    </h2>
                    <div id="country${key}" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body py-5">
                            <div class="row align-items-center text-center gy-5 gy-md-0">
                                <div class="col-12 col-md-2"><img src="${data[key]['flag']}"
                                        class="img-fluid" id="flag"></div>
                                <div class="col-12 col-md-10">
                                    <div class="row">
                                        <div class="col-12 col-md">
                                            <h2>نام کشور : <span id="name">${data[key]["nativeName"]}</span></h2>
                                        </div>
                                        <div class="col-12 col-md">
                                            <h2>منطقه : <span id="region">${data[key]['region']}</span></h2>
                                        </div>
                                        <div class="col-12 col-md">
                                            <h2>جمعیت : <span id="population">${data[key]['population']}</span></h2>
                                        </div>
                                        <div class="col-12 col-md">
                                            <h2>واحد پول : <span id="currency">${data[key]['currencies'].map(item=>item['name'])}</span></h2>
                                        </div>
                                    </div>
                                    <div class="row mt-5">
                                        <div class="col-12 col-md">
                                            <h2>پایتخت : <span id="capital">${data[key]['capital']}</span></h2>
                                        </div>
                                        <div class="col-12 col-md">
                                            <h2>TLD(نام دامنه) : <span id="tld">${data[key]['topLevelDomain'].map(item=> item)}</span></h2>
                                        </div>
                                        <div class="col-12 col-md">
                                            <h2>کد تماس کشور : <span id="callingcode">${data[key]['callingCodes'].map(item=>item)}</span></h2>
                                        </div>
                                    </div>
                                    <div class="row mt-5 w-100 h-100">
                                        <div class="col-12" id="map" style="width:100%; height:300px">
        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>`;
            showMap()
        } else continue
    }
}


// Get name of countries and add them in select element
function addCountryNameToSelect(data) {
    const select = document.querySelector('#countries')
    for (const key in data) {
        select.innerHTML += `<option value="${data[key]['name']}">${data[key]['translations']['fa']}</option>`
    }
}
// Show map
function showMap() {
    let app = new Mapp({
        element: '#map',
        presets: {
            latlng: {
                lat: _latlng[0],
                lng: _latlng[1],
            },
            zoom: 6
        },
        apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY5N2JlMTYzMjVkNDBhNGIxMzRhZTc2NTg4MjllNzIxZjc3MDAyNWRkMWYzM2ExZTkwMjk0ZjE5MzgwYzZhMTBkZDY2YjMzOWIzNDczNzM1In0.eyJhdWQiOiIxNDIyNCIsImp0aSI6IjY5N2JlMTYzMjVkNDBhNGIxMzRhZTc2NTg4MjllNzIxZjc3MDAyNWRkMWYzM2ExZTkwMjk0ZjE5MzgwYzZhMTBkZDY2YjMzOWIzNDczNzM1IiwiaWF0IjoxNjIyNjk4MjYyLCJuYmYiOjE2MjI2OTgyNjIsImV4cCI6MTYyNTI5MDI2Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.gE_9qAVGq-075HPb-dVnzNkQKXGPnl3-zRQvX-B15lBrhS6sy6jWw--0HHivYWrqzEBYPYvepzX71G93SE6UJyX5iOptotLN6zhm4p-BUz1vxcdO4b78cWZ-nPxxZkDd8b5otlkthUOirBTcCbo1zXto2E1arvNoWl1_7OaWJJPxdFZXWRtz5F50AbZlQTP5Rod2zv02bZZnhVQrHwePmevW8jAiOG_EaD8QTJz9WXtCcz0TLyEg-816QzgCeyVSqY250zURAU4Z4E0X5HxPdkkow0uSSfHeb9wchrXI06QZAni1UTKBC00gVcDMVL96fAEzzFlsHa_cdRgDyHt6EA'
    });
    app.addLayers();
}