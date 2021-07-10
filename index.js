const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

console.log("Corona Tracker");

let time = document.getElementById('time');
time.innerText = formatDate(new Date());

let country = document.getElementById('country');
let cases = document.getElementById('cases');
let deaths = document.getElementById('deaths');
let recovered = document.getElementById('recovered');
let selector = document.getElementById('selector');
let submit = document.getElementById('submit');

async function getData(){
    const response = await fetch('https://covid-api.mmediagroup.fr/v1/cases?country=India')
    const data = await response.json();
    return data;
}

let data = getData();
populate(data)


country.addEventListener('click', () => {
    country.style.border = "2px solid rgb(0, 204, 255)";
})
submit.addEventListener('click', () => {
    let state = country.value;
    state = state[0].toUpperCase() + state.substring(1);
    showData(data, state);
    
});

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    let dateValue = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();

    return (months[date.getMonth()]) + " " + dateValue + ", " + date.getFullYear() + ", " + strTime;
}

function populate(data){
    data.then(list => {
        let states = "";
        for(item in list){
            if(item == 'All')   continue;
            states += `<option value="${item}"></option>`
        }
        selector.innerHTML = states;
    })
    
}

function showData(data, state){

    data.then( list => {
        let dateTime = new Date(list[state]["updated"]);
        let dateTimeStr = formatDate(dateTime);
        time.innerText = dateTimeStr;
        cases.innerText = list[state]["confirmed"];
        deaths.innerText = list[state]["deaths"];
        recovered.innerText = list[state]["recovered"];
    });
    data.catch(reason => console.log("reason is -- " + reason));
}
