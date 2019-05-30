$(document).ready(function () {

    console.log("Surekshya Sharma");


    getSalesforceDates();
}); 

function getSalesforceDates() {

    console.log("(ajax-call)Starting.........");

    $.ajax({
        type: "GET",

        url: "https://staging-stthomas.cs42.force.com/applicantportal/services/apexrest/usteventfeed?eventId=a3s56000000Mf6n&feedType=eventList&viewStart=2019-6-3+00:00:00&viewEnd=2019-9-3+24:59:59",

        dataType: "jsonP",

        error: function(error){
            alert("Error Occured");
            console.log("Failed ajax call" , error);
        },

        success: function(data){
            // console.log("DATA:", data.ID);
            $.each(data, function(key, value){
                console.log("event ID:", value.ID);
                
            })
        }
        
       

    });
}