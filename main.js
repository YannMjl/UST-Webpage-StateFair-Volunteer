// Do some stuff when page hmtl page is launched
$(document).ready(

    function showEvent() {

        var state_fair_2019_feed = 'https://staging-stthomas.cs42.force.com/applicantportal/services/apexrest/usteventfeed?eventId=a3s56000000Mf6n&feedType=eventList&viewStart=2019-6-3+00:00:00&viewEnd=2019-9-3+24:59:59';

        $.ajax({

            type: "GET",

            url: state_fair_2019_feed,

            dataType: "jsonP", // use JsonP for datatype if API does not have CORS set

            error: function (e) {
                alert("An error occurred while processing API calls");
                console.log("API call Failed: ", e);
            },

            success: function (data) {

                // sort data by date
                _sortedData = data.sort(function(a, b) { 
                    // * - 1 : get a reverse sort
                    return (new Date(b.start) - new Date(a.start)) * - 1; 
                });

                // store event sponsor for each day
                var _eventSponsor;

                // get event dates sequences
                var _eventdates = new Array();
                $.each(_sortedData, function (index, value) {
                    // get Event dates for sign up
                    var _startDate = new Date(value.start);
                    var _datetext = _startDate.toDateString();
                    _eventdates.push(_datetext);
                });

                // removed duplicates from eventdates array
                var _nonDuplicateDates = $.unique(_eventdates);
                _nonDuplicateDates.forEach(function (_date){

                    _eventDate = new Date(_date).toLocaleString('en-US', 
                        {
                            day: 'numeric',
                            weekday: 'long',
                            month: 'long',
                            year: 'numeric'    
                        }
                    );  

                    $.each(_sortedData, function (index, value) {
                        // get start and end dates for sign up 
                        var _startDate = new Date(value.start),
                            _endDate = new Date(value.end);
                        var _datetext = _startDate.toDateString();

                        // get Event sponsor
                        if (_datetext == _date) {
                            _eventSponsor = value.instanceDesc;
                            console.log(_eventSponsor);
                        }
                    });
                    // add event dates to HTML 
                    $('.showSignUp').append(
                        '<div class="row">' +
                            '<div class="left">' +
                                '<p style="display: inline; float: left;">' +
                                    '<strong>' + _eventDate + '</strong><br>' +
                                    '<strong>' + _eventSponsor + '</strong><br>' +
                                '</p>' +
                            '</div>' +
                        '</div>'
                    );


                    $.each(_sortedData, function (index, value) {

                        // get URL - Salesforce UST event management tool 
                        var _eventUrl = value.eventUrl;

                        // get start and end dates for sign up 
                        var _startDate = new Date(value.start),
                            _endDate = new Date(value.end);
                        var _datetext = _startDate.toDateString();

                        // get start and end time 
                        var _startTime = _startDate.toLocaleTimeString([], 
                            { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                timeZone: "UTC"
                            }
                        );
                        var _endTime = _endDate.toLocaleTimeString([], 
                            { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                timeZone: "UTC"
                            }  
                        );

                        // add times and event sponsors to HTML
                        if (_datetext == _date) {

                            $('.showSignUp').append(
                                '<div class="row">' +
                                    '<div class="left">' +
                                        '<p style="display: inline; float: left;">' +
                                            '<p class="time">' +
                                                _startTime + ' - ' + _endTime + 
                                            '</p>' +
                                        '</p>' +
                                    '</div>' +

                                    '<div class="right">' +
                                        '<p style="margin: 0px 0px 0px 15px!Important; display: inline;">' +
                                            '<a href="' + _eventUrl + '" target="_blank" style="font-weight: bold; color: #9e28b5;">' +
                                                '<button class="button" style="vertical-align:middle"><span>Register </span></button>' +
                                            '</a>' +
                                        '</p>' +
                                    '</div>' +
                                '</div>'
                            );

                        } // end: if date statement

                    }); // end of loop: through sorted date

                }); // end of loop : noneduplicate date

            } // end:  Ajax success API call

        }); // end: of Ajax call

    } // end: showEvent function

); // end: document.ready()