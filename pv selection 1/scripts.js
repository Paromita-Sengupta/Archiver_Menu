let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



var pvList = [];

//var patternList =[];

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



function getPatt(pv) {
    var myData = [];

    for (var p = 0; p < pv.length; p++) {
        if (p != pv.length - 1) {
            pv[p] = pv[p] + "&regex=";
            myData.push(pv[p]);

        } else if (p == pv.length - 1) {
            myData.push(pv[p]);
        }

    }

    return myData;

}

function showCalendar(month, year) {

    var show_pvs = document.getElementById("mySelect");

    //get the url
    var urlParam = new URLSearchParams(window.location.search);

    //console.log(urlParam.get("PATTERN"));

    var header = urlParam.get('H1');
    document.getElementById("h1").innerHTML = header;

    //get pattern from urlf
    var patt = encodeURI(urlParam.get('PATTERN'));
    console.log("pattern: " + patt);

    //get list of pvs from urlf
    var pv = []
    pv = urlParam.getAll('pv');

    //if pvLists then getdata from the server directly
    if (pv.length != 0) {

        console.log("pv:" + pv);
        var s = pv.toString().split(",");

        for (var p = 0; p < s.length; p++) {
            var opt = document.createElement('option');
            opt.value = s[p];
            opt.innerHTML = s[p];
            show_pvs.appendChild(opt);
        }
        var pvs = getData(pv);



        var str = pvs.toString().replace(/,/g, '');
        console.log(str);
        //a.href = "http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv=" + str + "&from=" + selectYear.value + "-" + v + "-" + d + "T23:59:59&to=" + selectYear.value + "-" + v + "-" + date + "T23:59:59";




        /////////////////


        //               console.log(pvs);




    } else {
        //if patterns then split with "|" and get data by requesting from the server seperately in loops
        var pattList = [];

        //const patternList = [];


        if (patt.indexOf('%7C') > -1) {
            var length = patt.indexOf('%7C');
            var pattern = patt.split("%7C");
            pattList.push(pattern);

            console.log(pattList[0]);

            var test = pattList[0];

            //for patterns
            //var s = test.toString().replace(/,/g, '<br>'); 
            //show_pvs.innerHTML= s;




            var patternList = [];
            for (var m = 0; m < test.length; m++)

            {

                var url1 = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex=" + test[m];

                var url2 = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&pv=" + test[m];
                i = 0;



                get_pvs(url1, url2, test[m], urlParam, function(pvs2) {
                    i += 1;

                    pvs2.forEach(p => patternList.push(p));
                    var test = pattList[0];


                    //var s = patternList.toString().replace(/,/g, '<br>'); 
                    //show_pvs.innerHTML= s;
                    //console.log(s);

                    var s = patternList;

                    for (var p = 0; p < s.length; p++) {
                        var opt = document.createElement('option');
                        opt.value = s[p];
                        opt.innerHTML = s[p];
                        show_pvs.appendChild(opt);
                    }

                    if (pvs2.length == -1) {
                        if (patternList.length == 0) {
                            console.log("chain loop");
                            alert("The requested item is empty.\nPlease confirm by trying to look this up in the old archiver.");
                        }

                    }


                    //console.log(patternList)



                    //show_pvs.innerHTML= str;
                    //a.href = "http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv=" + str + "&from=" + selectYear.value + "-" + v + "-" + d + "T23:59:59";
                    //cell.appendChild(a);
                    //row.appendChild(cell);
                    //date++;
                    //continue;
                    // color today's date




                });

            }


        } else {
            //for simple patterns get data from the server directly
            console.log("pattern:" + patt);

            //checking with both "pv=" & "regex="

            var url1 = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex=" + patt;

            var url2 = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&pv=" + patt;



            get_pvs(url1, url2, patt, urlParam, function(pvs2) {

                //console.log(pvs2);
                //var s = pvs2.toString().split(","); 

                for (var p = 0; p < pvs2.length; p++) {
                    var opt = document.createElement('option');
                    opt.value = pvs2[p];
                    opt.innerHTML = pvs2[p];
                    show_pvs.appendChild(opt);
                }




            });




        }


    }
}


function getData(pv) {
    var myData = [];

    for (var p = 0; p < pv.length; p++) {
        if (p != pv.length - 1) {
            pv[p] = pv[p] + "&pv=";
            myData.push(pv[p]);

        } else if (p == pv.length - 1) {
            myData.push(pv[p]);
        }

    }

    return myData;

}



function get_pvs(url1, url2, patt, urlParam, callback) {

    EmptyList = []
    var request = new XMLHttpRequest();

    //request.responseType = 'json';



    var pvList = [];

    request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //console.log(request.responseText);

            pvList = JSON.parse(request.response);
            console.log(pvList);

            if (pvList.length != 0 && checked == (1 || 0)) {

                console.log(pvList);


                //store(pvList);

                //return pvList;
                callback(pvList);

            } else if (checked == 0) {
                checked = checked + 1;
                request.open('GET', url2, true);
                request.send();

            } else if (pvList.length == 0 && fcheck == 0) {
                //adding ".*" to the beginning or ending of the patterns.
                fcheck += 1;
                if (!patt.startsWith("%") && !patt.endsWith("$")) {
                    var p = ".*" + patt + ".*";
                    var url = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex=" + p;
                    request.open('GET', url, true);
                    request.send();

                } else if (patt.startsWith("%") && !patt.endsWith("$")) {
                    var p = patt + ".*";
                    console.log(p);
                    var url = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex=" + p;
                    request.open('GET', url, true);
                    request.send();

                } else if (!patt.startsWith("%") && patt.endsWith("$")) {
                    var p = ".*" + patt;
                    console.log(p);
                    var url = "http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex=" + p;
                    request.open('GET', url, true);
                    request.send();

                }



            } else {
                console.log("empty list");
                alert("The requested item is empty.\nPlease confirm by trying to look this up in the old archiver.");

                callback(EmptyList);
            }


        } else {
            callback(EmptyList);
        }

    };
    var fcheck = 0;
    var checked = 0;
    request.open('GET', url1, true);
    request.send();

    //    return pvList;


}

document.addEventListener("DOMContentLoaded", function() {

});
