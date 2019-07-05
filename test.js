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




    var urlParam = new URLSearchParams(window.location.search);

    console.log(urlParam.get("PATTERN"));

    var header = urlParam.get('H1');
    document.getElementById("h1").innerHTML =header;

    //let params = new URLSearchParams(url.search.slice("PATTERN"));

   //var p = urlParam.toString();

   //console.log(p);



	 var patt = encodeURI(urlParam.get('PATTERN'));

         //console.log(patt);



   var pv = []
   pv = urlParam.getAll('pv');

   //console.log(pv);
   if (pv.length != 0)
   {

    console.log("pv:"+pv);
//    var url = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&pv=;
//
//    var header = urlParam.get('h1');
//    document.getElementById("h1").innerHTML =header;
//
//    get_pvs(url, urlParam, function (pvs2) {

   var pvs = getData(pv);

   var str = pvs.toString().replace(/,/g, '');
   console.log(str);


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
		let d=date-1;



                   a.href = "http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv="+str+"&from="+selectYear.value+"-"+v+"-"+d+"T23:59:59&to="+selectYear.value+"-"+v+"-"+date+"T23:59:59";
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
}

else
{
   var pattList =[];



   if (patt.indexOf('%7C') > -1)
{
    var length = patt.indexOf('%7C');
    var pattern = patt.split("%7C");
    pattList.push(pattern);

   var str = pvs2.toString().replace(/,/g, '');
    console.log(pattList);
    var pt = get_patt(pattlist);

    //console.log("pattern:"+patt);

   var url1 = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex="+pt;

   var url2= "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&pv="+pt;



    get_pvs(url1, url2,  urlParam, function (pvs2) {

  //console.log(pvs);


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

                var str = pvs2.toString().replace(/,/g, '');




               var d =date-1;





                   a.href = "http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv="+str+"&from="+selectYear.value+"-"+v+"-"+d+"T23:59:59&to="+selectYear.value+"-"+v+"-"+date+"T23:59:59";
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



});





}



else{
    var str = pvs2.toString().replace(/,/g, '');
    console.log(pattList);
    var pt = get_patt(pattlist);

    console.log("pattern:"+patt);

   var url1 = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex="+patt;

   var url2= "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&pv="+patt;



    get_pvs(url1, url2,  urlParam, function (pvs2) {

  //console.log(pvs);


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

                var str = pvs2.toString().replace(/,/g, '');




               var d =date-1;





                   a.href = "http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv="+str+"&from="+selectYear.value+"-"+v+"-"+d+"T23:59:59&to="+selectYear.value+"-"+v+"-"+date+"T23:59:59";
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



});





}


}
//});
//}



function appendData(data) {
     var myData =[];

                  var pvs= JSON.parse(data);
                  for(var i=0; i<pvs.length; i++) {
                    if (i != pvs.length -1 )
		{
                     pvs[i]= pvs[i] + "&pv=";
                     myData.push(pvs[i]);

		}
		else if (i == pvs.length -1 )
		{
		myData.push(pvs[i]);
		}

 }


return myData;

}

function getData(pv) {
     var myData =[];

                 for(var p=0; p<pv.length; p++) {
                    if (p != pv.length -1 )
		{
                     pv[p]= pv[p] + "&pv=";
                     myData.push(pv[p]);

		}
		else if (p == pv.length -1 )
		{
		myData.push(pv[p]);
		}

                 }

return myData;

}

function getPatt(patt) {
     var myData =[];

                 for(var p=0; p<patt.length; p++) {
                    if (p != patt.length -1 )
		{
                     patt[p]= patt[p] + "&pv=";
                     myData.push(patt[p]);

		}
		else if (p == patt.length -1 )
		{
		myData.push(patt[p]);
		}

                 }

return myData;

}

function get_pvs(url1, url2, urlParam, callback)
{

    EmptyList =[]
    var request = new XMLHttpRequest();

//                request.responseType = 'json';



    var pvList=[];

    request.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

    //console.log(request.responseText);

     pvList =appendData(request.response);

   if (pvList.length !=0 && checked == (1 || 0 )){

     console.log(pvList);
     //return pvList;
     callback(pvList);

    }
   else if (checked == 0)
   {
    checked = checked+1;
    request.open('GET', url2,true);
    request.send();

   }
   else
   {
      console.log("empty list");
      callback(pvList);
   }
}

else
{
  callback(EmptyList);
}

};
    var checked=0;
    request.open('GET', url1,true);
    request.send();

//    return pvList;


}

document.addEventListener("DOMContentLoaded", function () {

});