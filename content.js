const color = ["green", "orange", "red", "dayTripper", "blue", "pink", "atlas", "electricViolet", "windy", "bloodyMary"]
const color_r = ["green-r", "orange-r", "red-r", "dayTripper-r", "blue-r", "pink-r", "atlas-r", "electricViolet-r", "windy-r", "bloodyMary-r"]

function getDOM(selector) {
    return document.querySelector(selector);
}

function getDOMs(selector) {
    return document.querySelectorAll(selector);
}

function getDOMText(selector) {
    let obj = getDOM(selector);
    if (obj) return obj.innerText;
    return null;
}

function convertDayToNumber(day) {
    var dayArr = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
    return dayArr.indexOf(day);
}

function modTime(time) {



    var res = time.split(" ");

    var length = res.length;

    if (length > 1) {

        var type1 = res[2].replace("น.(", "").replace(")", "");

        var day2;
        if (length > 3) {
            var temp = res[2].replace("น.(", "").replace(")", "").split("\n");
            type1 = temp[0];
            day2 = temp[1]
        }

        console.log("day >>> " + res[0])

        var obj = {
            haveTime: true,
            day: convertDayToNumber(res[0].replace(".", "")),
            time: res[1].replace(":", ".").replace(":", "."),
            type: type1,
            isTwo: length > 3 ? true : false,
            day2: length > 3 ? convertDayToNumber(day2.replace(".", "")) : null,
            time2: length > 3 ? res[3].replace(":", ".").replace(":", ".") : null,
            type2: length > 3 ? res[4].replace("น.(", "").replace(")", "") : null
        };
        return obj;

    }
    var obj = {
        haveTime: false
    };
    return obj;
}

// add data to table

var n = document.querySelectorAll(`table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr`).length;
n = n > 13 ? ((n - 14) / 2) : 0;

const arr = [];
if (n !== 0) {
    for (var i = 0; i < n; i++) {
        // console.log(getDOMText(
        //   `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(3)`
        // ));
        arr.push({
            id: getDOMText(
                `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(3)`
            ),
            subject: getDOMText(
                `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(5)`
            ),
            credit: getDOMText(
                `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(7)`
            ),
            theory: getDOMText(
                `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(9)`
            ),
            practice: getDOMText(
                `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(11)`
            ),
            time: modTime(getDOMText(
                `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(13)`
            )),
            room: getDOMText(
                `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(15)`
            ),
            building: getDOMText(
                `table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr:nth-child(${15 + (i * 2)}) > td:nth-child(17)`
            )
        });
        // console.log("Round:"+i+" >> ")

    }
    // console.log(arr[0].subject)
}



// start here
//first time loading

let mode = 'new';
let oldTableHTML = document.querySelector('body').innerHTML;

document.querySelector('body').innerHTML += `
  <button type="button" class="btn btn-primary btn-sm stick-left-corner noprint" id="switchModeButton">
  Old Design
  </button>
  `;

document.querySelector('#switchModeButton').addEventListener('click', () => {
    switchTableUI();
});

switchNewDesign();

function switchMode() {
    mode == 'old' ? (mode = 'new') : (mode = 'old');
}

function switchNewDesign() {

    let main = getDOM('body > center');
    let otherTable = ``;


    if (n !== 0) {
        let count = 1;
        for (var i = 0; i < n; i++) {
            if (!arr[i].time.haveTime) {
                if (count === 1) otherTable = ``;
                // for (var j = 0; j < 5; j++) {
                otherTable += ` <tr>
                                    <td>${count}</td>
                                    <td>`+ arr[i].id + `</td>
                                    <td>`+ arr[i].subject + `</td>
                                    <td>`+ arr[i].credit + `</td>
                                    <td>`+ arr[i].theory + `</td>
                                    <td>`+ arr[i].practice + `</td>
                                </tr>`;
                // }
                count++;
            }
        }
    }

    const newTableHTML = ` 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>ตารางเรียนส่วนบุคคล</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Kanit:200&subset=thai" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>

<body>
    <div class="wrapper">
        <div class="top">
            <div class="title">
                <h1>ตารางเรียนส่วนบุคคล</h1>
                <h3>${getDOMText(`table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody >
                    tr:nth-child(4)`)}
                </h3>
                <h3>${getDOMText(`table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody >
                    tr:nth-child(6)`)}
                </h3>
                <h3>${getDOMText(`table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody >
                    tr:nth-child(8)`)}
                </h3>
                <h3>${getDOMText(`table:nth-child(1) > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody >
                    tr:nth-child(10)`)}
                </h3>
            </div>
        </div>
        <div class="content">
            <button class="btn-print noprint" id="print"><i class="fa fa-print"></i></button>
            <div class='centered'>
                <div id='schedule'>
                    <div class='s-legend'>
                        <div class='s-cell s-head-info'>
                            <div class='s-name'>Time Table</div>
                        </div>
                        <div class='s-week-day s-cell'>
                            <div class='s-day'>Mon</div>
                        </div>
                        <div class='s-week-day s-cell'>
                            <div class='s-day'>Tue</div>
                        </div>
                        <div class='s-week-day s-cell'>
                            <div class='s-day'>Wed</div>
                        </div>
                        <div class='s-week-day s-cell'>
                            <div class='s-day'>Thu</div>
                        </div>
                        <div class='s-week-day s-cell'>
                            <div class='s-day'>Fri</div>
                        </div>
                        <div class='s-week-day s-cell'>
                            <div class='s-day'>Sat</div>
                        </div>
                        <div class='s-week-day s-cell'>
                            <div class='s-day'>Sun</div>
                        </div>
                    </div>
                    <div class='s-container s-block'>
                        <div class='s-head-info'>
                            <div class='s-head-hour'>
                                <div class='s-number'>1</div>
                                <div class='s-hourly-interval'>8.00-9.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>2</div>
                                <div class='s-hourly-interval'>9.00 - 10.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>3</div>
                                <div class='s-hourly-interval'>10.00 - 11.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>4</div>
                                <div class='s-hourly-interval'>11.00 - 12.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>5</div>
                                <div class='s-hourly-interval'>12.00 - 13.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>6</div>
                                <div class='s-hourly-interval'>13.00 - 14.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>7</div>
                                <div class='s-hourly-interval'>14.00 - 15.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>8</div>
                                <div class='s-hourly-interval'>15.00 - 16.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>9</div>
                                <div class='s-hourly-interval'>16.00 - 17.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>10</div>
                                <div class='s-hourly-interval'>17.00 - 18.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>11</div>
                                <div class='s-hourly-interval'>18.00 - 19.00</div>
                            </div>
                            <div class='s-head-hour'>
                                <div class='s-number'>12</div>
                                <div class='s-hourly-interval'>19.00 - 20.00</div>
                            </div>
                        </div>
                        <div class='s-rows-container'>
                            <div class='s-activities'>
                                <div class='s-act-row'></div>
                                <div class='s-act-row'></div>
                                <div class='s-act-row'></div>
                                <div class='s-act-row'></div>
                                <div class='s-act-row'></div>
                                <div class='s-act-row'></div>
                                <div class='s-act-row'></div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                            <div class='s-row s-hour-row'>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                                <div class='s-hour-wrapper s-cell'>
                                    <div class='s-half-hour'></div>
                                    <div class='s-half-hour'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-other noprint">
                <table class="other">
                <thead>
                    <tr>
                        <th colspan="6">รายวิชาที่ไม่ทราบเวลาเรียน</th>
                    </tr>
                    <tr>
                        <th class="c">ลำดับ</th>
                        <th>รหัสวิชา</th>
                        <th>ชื่อวิชา</th>
                        <th class="c">หน่วยกิต</th>
                        <th class="c">ทฤษฎี</th>
                        <th class="c">ปฏิบัติ</th>
                    </tr>
                    <thead>
                    <tbody>
                    ${otherTable.length === 0 ? `<tr><td colspan="6" class="c">ไม่มีรายการ</td></tr>` : otherTable}
                    </tbody>
                    <table />                
                </div>
            </div>
        </div>
        
    </div>
    <footer class="noprint footer">Contact me <a href="https://www.facebook.com/Chaloemphisit">Chaloemphisit</a>,
        powered by <a href="https://csag.kmi.tl/">CSAG</a>
    </footer>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="js/index.js"></script>
</body>

</html>
  `;
    main.innerHTML = newTableHTML;

    document.querySelector('#switchModeButton').className =
        'btn btn-sm stick-left-corner noprint';
    document.querySelector('#switchModeButton').innerText = 'Old design';

    document.querySelector('#print').addEventListener('click', () => {
        window.print();
    });

}

// --------------------------------------------------------------------
var schedule = {
    initialize: function () {
        schedule.activities.set();

    },
    options: {
        schedule: '#schedule',
        breaks: [0, 0, 0, 0, 0, 0, 0, 0, 0], // breaks duration
        s_breaks: [475, 525, 575, 630, 695, 750, 815, 870, 920], // the time after which the break begins
        lesson_time: 60, // lesson duration (minutes)
        lessons: 10, // number of lessons per week
        start: function () { // start at 7.10 
            return schedule.general.toMin(8, 00)
        },
        end: function () { // start at 16.10 
            return schedule.general.toMin(20, 00)
        },
        h_width: $('.s-hour-row').width(), // get a width of hour div
        minToPx: function () { // divide the box width by the duration of one lesson
            return schedule.options.h_width / schedule.options.lesson_time;
        },
    },
    general: {
        hoursRegEx: function (hours) {
            var regex = /([0-9]{1,2}).([0-9]{1,2})-([0-9]{1,2}).([0-9]{1,2})/;
            if (regex.test(hours)) {
                return true;
            } else {
                return false;
            }

        },
        toMin: function (hours, minutes, string) {
            // change time format (10,45) to minutes (645)
            if (!string) {
                return (hours * 60) + minutes;
            }

            if (string.length > 0) {
                // "7.10"
                var h = parseInt(string.split('.')[0]),
                    m = parseInt(string.split('.')[1]);

                return schedule.general.toMin(h, m);
            }
        },
        getPosition: function (start, duration, end) {
            var translateX = (start - schedule.options.start()) * schedule.options.minToPx(),
                width = duration * schedule.options.minToPx(),
                breaks = schedule.options.breaks,
                s_breaks = schedule.options.s_breaks;

            $.each(breaks, function (index, item) {
                if (start < s_breaks[index] && duration > item && end > (s_breaks[index] + item)) {
                    width -= item * schedule.options.minToPx();
                }
                if (start > s_breaks[index] && duration > item && end > (s_breaks[index] + item)) {
                    translateX -= item * schedule.options.minToPx();
                }
            });

            return [translateX, width];
        }
    },
    activities: {
        find: function (week, hours, id) {

        },
        delete: function (week, hours) {
            /* week: 0-4 << remove all activities from a day 
               hours: "7.10-16.10" << remove all activities from a choosed hours
            */
            function finalize(message) {
                if (confirm(message)) {
                    return true;
                }
            }

            if (week && !hours) {
                if (finalize("Do you want to delete all activities on the selected day?")) {
                    $('.s-activities .s-act-row:eq(' + week + ')').empty();
                }
            }

            if (!week && !hours) {
                console.log('Error. You have to add variables like a week (0-4) or hours ("9.10-10.45")!')
            }
            // if day is not defined and hours has got a correct form
            if (!week && schedule.general.hoursRegEx(hours)) {

                console.log('Week not defined and hours are defined!');

                $(schedule.options.schedule + ' .s-act-tab').each(function (i, v) {
                    var t = $(this), // get current tab
                        name = t.children('.s-act-name').text(), // get tab name
                        h = t.attr('data-hours').split('-'), // get tab hours
                        s = schedule.general.toMin(0, 0, h[0]), // get tab start time (min)
                        e = schedule.general.toMin(0, 0, h[1]), // get tab end time (min)
                        uh = hours.split('-'), // user choosed time
                        us = schedule.general.toMin(0, 0, uh[0]), // user choosed start time (min)
                        ue = schedule.general.toMin(0, 0, uh[1]); // user choosed end time (min)

                    if (us <= s && ue >= e) {
                        $(this).remove();
                    }

                })

            }

            if (week && hours) {
                // if week and hours is defined 
                console.log('Week is defined and hours are defined too!');

                $('#schedule .s-act-row:eq(' + week + ') .s-act-tab').each(function (i, v) {
                    var t = $(this), // get current tab
                        name = t.children('.s-act-name').text(), // get tab name
                        h = t.attr('data-hours').split('-'), // get tab hours
                        s = schedule.general.toMin(0, 0, h[0]), // get tab start time (min)
                        e = schedule.general.toMin(0, 0, h[1]), // get tab end time (min)
                        uh = hours.split('-'), // user choosed time
                        us = schedule.general.toMin(0, 0, uh[0]), // user choosed start time (min)
                        ue = schedule.general.toMin(0, 0, uh[1]); // user choosed end time (min)

                    if (us <= s && ue >= e) {
                        $(this).remove();
                    }

                })


            };

        },
        add: function (week, subject, hours, group, building, color) {
            /* EXAMPLES --> week: 0-6, subject: "Math", hours: "9.45-12.50", 
            group: "A", building: "A. Badurski", color: "orange" */
            var tab = "<div class='s-act-tab " + color + "' data-hours='" + hours + "'>\
            <div class='s-act-name'>"+ subject + "</div>\
            <div class='s-wrapper'>\
              <div class='s-act-building'>"+ building + "</div>\
              <div class='s-act-room'>"+ hours + "</div>\
              <div class='s-act-group'>"+ group + "</div>\
            </div>\
          </div>";
            $('.s-activities .s-act-row:eq(' + week + ')').append(tab);
            schedule.activities.set();
        },
        set: function () {
            $(schedule.options.schedule + ' .s-act-tab').each(function (i) {
                var hours = $(this).attr('data-hours').split("-"),
                    start = /* HOURS */ parseInt(hours[0].split(".")[0] * 60)
                        + /* MINUTES */ parseInt(hours[0].split(".")[1]),
                    end = /* HOURS */ parseInt(hours[1].split(".")[0] * 60)
                        + /* MINUTES */ parseInt(hours[1].split(".")[1]),
                    duration = end - start,
                    translateX = schedule.general.getPosition(start, duration, end)[0],
                    width = schedule.general.getPosition(start, duration, end)[1];

                $(this)
                    .attr({ "data-start": start, "data-end": end })
                    .css({ "transform": "translateX(" + translateX + "px)", "width": width + "px" });
            });
        }
    }

}

schedule.initialize();
// --------------------------------------------------------------------

if (n !== 0) {
    for (var i = 0; i < n; i++) {
        // console.log("i:"+i+", subject : " + arr[i].subject + ", day : " + arr[i].time.day + ", time : " + arr[i].time.time)
        if (arr[i].time.haveTime) {
            schedule.activities.add(arr[i].time.day, arr[i].subject, arr[i].time.time, "section " + arr[i].theory + " (" + arr[i].time.type + ")", (arr[i].building + " " + arr[i].room), color[(i % 9)]);
            if (arr[i].time.isTwo) {
                schedule.activities.add(arr[i].time.day2, arr[i].subject, arr[i].time.time2, "section " + arr[i].practice + " (" + arr[i].time.type2 + ")", (arr[i].building + " " + arr[i].room), color_r[(i % 9)]);
            }
        }
        // console.log((i % 6) + ", " + color[i % 6])
    }
}

// schedule.activities.add(6,"Physics", "8.00-12.00", 102, "A", "B.KononSSSSSSSSSSSSS","pink");
// schedule.activities.add(2,"Physics", "16.30-19.30", 102, "A", "B.ggggg","red");

function switchTableUI() {
    switchMode();
    window.scrollTo(0, 0);
    if (mode == 'old') {
        let main = getDOM('body > center');
        main.innerHTML = oldTableHTML;
        document.querySelector('#switchModeButton').className =
            'btn red stick-left-corner noprint';
        document.querySelector('#switchModeButton').innerHTML =
            '<strong>Recommended!</strong> New design';
    } else {
        location.reload();
        // switchNewDesign();
    }
}