// Do some stuff when page hmtl page is launched
$(document).ready(function () {

    $("#headerTitle").hide(300).show(1500);

    // calling show Events list function
    showEvent();
});

function showEvent() {

    var eventId = 'a3s56000000Mf6n',
        viewStart = '2019-5-3+00:00:00',
        viewEnd = '2019-12-3+00:00:00',
    state_fair_2019_feed = 'https://staging-stthomas.cs42.force.com/applicantportal/services/apexrest/usteventfeed?eventId=a3s56000000Mf6n&feedType=eventList&viewStart=2019-6-3+00:00:00&viewEnd=2019-9-3+24:59:59';
   
    $.ajax({

        type: "GET",

        url: state_fair_2019_feed,

        data: {
            'feedType': 'eventList',
            'eventId': eventId,
            'viewStart': viewStart.replace("+", " "),
            'viewEnd': viewEnd.replace("+", " ")
        },

        dataType: "jsonP", // use JsonP for datatype if API does not have CORS set

        error: function (e) {
            alert("An error occurred while processing API calls");
            console.log("API call Failed: ", e);
        },

        success: function (data){

            $.each(data, function (index, value) {

                // get URL - Salesforce UST event management tool 
                var _eventUrl = value.eventUrl;

                // get Event details for sign up
                var _startDate = new Date(value.start),
                _endDate = new Date(value.end);
                var _datetext = _startDate.toDateString();

                var _startTime = _startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                _endTime = _endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                

                $('.showSignUp').append(

                    '<div class="row">' +

                        '<div class="left">' +
                            '<p style="display: inline; float: left;">' +
                                '<strong>' + _datetext + '</strong><br>' +
                                '<p class="time">' + _startTime + ' - ' + _endTime + '</p>' +
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
                
            });
            
        }

    });
}