let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



var pvList=[];

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}



function showCalendar(month, year) {

   var urlParam = new URLSearchParams("http://opi2017-005/sengupp/newCalendar.html?H1=0000-01: Dose Rate&PATTERN=%5BGN%5DP0000-01%3ARate%5FFiltered%24");

   var pv = urlParam.get('pv');

   //var patt = urlParam.get('PATTERN');

   console.log(pv);
//   if (pv != null)
//   {
//    var url = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&pv="+pv;

    var header = urlParam.get('h1');
    document.getElementById("h1").innerHTML =header;

//    get_pvs(url, urlParam, function (pvs2) {


    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                var a = document.createElement("a");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                a.appendChild(cellText);
//
                let selectYear = document.getElementById("year");
                let selectMonth = document.getElementById("month");
                let val =selectMonth.value;
                num= 1;
                let v = Number(val) + 1;

//                var str = pvs2.toString().replace(/,/g, '');





                   a.href = "http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv="+pv+"&from="+selectYear.value+"-"+v+"-"+date+"T23:59:59&to="+selectYear.value+"-"+v+"-"+date+"T23:59:59";
                   cell.appendChild(a);
                   row.appendChild(cell);
                   date++;

                   }


        }

        tbl.appendChild(row);


                   /////////////////


//               console.log(pvs);


             // appending each row into calendar body.
}



//});

}
//}
//
//else if (patt!=null)
//{
//
//    var url = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex="+patt;
//
//    var header = urlParam.get('H1');
//    document.getElementById("h1").innerHTML =header;
//
//    get_pvs(url, urlParam, function (pvs2) {
//
//
//    let firstDay = (new Date(year, month)).getDay();
//    let daysInMonth = 32 - new Date(year, month, 32).getDate();
//
//    let tbl = document.getElementById("calendar-body"); // body of the calendar
//
//    // clearing all previous cells
//    tbl.innerHTML = "";
//
//    // filing data about month and in the page via DOM.
//    monthAndYear.innerHTML = months[month] + " " + year;
//    selectYear.value = year;
//    selectMonth.value = month;
//
//    // creating all cells
//    let date = 1;
//    for (let i = 0; i < 6; i++) {
//        // creates a table row
//        let row = document.createElement("tr");
//
//        //creating individual cells, filing them up with data.
//        for (let j = 0; j < 7; j++) {
//            if (i === 0 && j < firstDay) {
//                let cell = document.createElement("td");
//                let cellText = document.createTextNode("");
//                cell.appendChild(cellText);
//                row.appendChild(cell);
//            }
//            else if (date > daysInMonth) {
//                break;
//            }
//
//            else {
//                let cell = document.createElement("td");
//                var a = document.createElement("a");
//                let cellText = document.createTextNode(date);
//                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
//                    cell.classList.add("bg-info");
//                } // color today's date
//                cell.appendChild(cellText);
//                a.appendChild(cellText);
////
//                let selectYear = document.getElementById("year");
//                let selectMonth = document.getElementById("month");
//                let val =selectMonth.value;
//                num= 1;
//                let v = Number(val) + 1;
//
//                var str = pvs2.toString().replace(/,/g, '');
//
//
//
//
//
//                   a.href = "http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv="+str+"&from="+selectYear.value+"-"+v+"-"+date+"T23:59:59&to="+selectYear.value+"-"+v+"-"+date+"T23:59:59";
//                   cell.appendChild(a);
//                   row.appendChild(cell);
//                   date++;
//
//                   }
//
//
//        }
//
//        tbl.appendChild(row);
//
//
//                   /////////////////
//
//
////               console.log(pvs);
//
//
//
//
//
//
//
//
//             // appending each row into calendar body.
//}
//
//
//
//});
//
//
//
//
//
//}
//
//}
//
//function appendData(data) {
//     var myData =[];
//
//                  var pvs= JSON.parse(data);
//                  for(var i=0; i<pvs.length; i++) {
//                    if (i != pvs.length -1 )
//		{
//                     pvs[i]= pvs[i] + "&pv=";
//                     myData.push(pvs[i]);
//
//		}
//		else if (i == pvs.length -1 )
//		{
//		myData.push(pvs[i]);
//		}
//
// }
//
//
//return myData;
//
//}
//
//function appendData_patt(data) {
//     var myData =[];
//
//                  var pvs= JSON.parse(data);
//                  for(var i=0; i<pvs.length; i++) {
//                    if (i != pvs.length -1 )
//		{
//                     pvs[i]= pvs[i] + "&regex=";
//                     myData.push(pvs[i]);
//
//		}
//		else if (i == pvs.length -1 )
//		{
//		myData.push(pvs[i]);
//		}
//
// }
//
//
//return myData;
//
//}
//
//function get_pvs(url, urlParam, callback)
//{
//
//var request = new XMLHttpRequest();
//
////                request.responseType = 'json';
//
//    var pvList=[];
//
//    request.onload = function() {
//     var pv = urlParam.get('pv');
//     if (pv!=null)
//     {
//     pvList =appendData(request.response);
//
//     console.log(pvList);
//     //return pvList;
//     callback(pvList);
//    }
//    else
//    {
//     pvList =appendData_patt(request.response);
//
//     console.log(pvList);
//     //return pvList;
//     callback(pvList);
//    }};
//    request.open('GET', url);
//    request.send();
//
////    return pvList;
//
//
//}
//
//document.addEventListener("DOMContentLoaded", function () {
//
//});