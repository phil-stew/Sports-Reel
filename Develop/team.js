
var teamListEl = $('#team_list');
var teamContEl = $('.container');
var teamNameEl = "";
let teamDB = [];    var eventDB = [];
var teamId = "";
function getTeams() {   /// Not used on this page
    var requestUrl = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4387';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            teamDB = data;
            console.log("teamDB: ", teamDB);
            getParams();

            //dispTeam();
        });
}
function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  //  var searchParamsArr = document.location.search.split('&');
  
    // Get the team index and teamid values
    //var teamIndex = searchParamsArr[0].split('=').pop();
    //var teamId = searchParamsArr[1].split('=').pop();
    var teamRec = sessionStorage.getItem("teamRecord");
   // console.log(teamRec)
    teamDB = JSON.parse(teamRec);
    //console.log("after parse : "+ teamDB);

    teamId = teamDB.idTeam;     /// teanDB is individual team record (object)
    dispTeam();
    getTeamDet(teamId);
  }
function getTeamDet(teamId){
    var reqUrl = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id="+teamId;
    fetch(reqUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           // console.log("teamDet: ", data);
            eventDB = data.results;
            dispTeamEvents(eventDB);
        });
}
function dispTeam() {
    teamId = teamDB.idTeam;
    var trec = teamDB; /// Individual team record
        var httPrefix = "https://";
         console.log(trec);
         /*strWebsite: "www.nba.com/nets" */
         //var logoEl =
          $('#logo').attr('src',trec.strTeamLogo)
         //var brandLogoEl = 
         $('.brand-logo').attr('href', httPrefix+trec.strWebsite).text(trec.strTeam);
        // var brandLogoEl = $('.brand-logo').attr('href', trec.strWebsite).append(logoEl);
                
         var navMobileEl = $('#nav-mobile')
         var aEl = $('<a>').attr('href',httPrefix+trec.strFacebook).text("Facebook")
         aEl.attr('target', '_blank');
         var liEl = $('<li>').append(aEl);
         navMobileEl.append(liEl);

         aEl = $('<a>').attr('href',httPrefix+trec.strInstagram).text("Instagram")
         aEl.attr('target', '_blank');
         liEl = $('<li>').append(aEl);
         navMobileEl.append(liEl);
         aEl = $('<a>').attr('href',httPrefix+trec.strTwitter).text("Twitter")
         aEl.attr('target', '_blank');
         liEl = $('<li>').append(aEl);
         navMobileEl.append(liEl);
         aEl = $('<a>').attr('href',httPrefix+trec.strYoutube).text("Youtube")
         aEl.attr('target', '_blank');
         liEl = $('<li>').append(aEl);
         navMobileEl.append(liEl);

         //var teamNameEl = $('#team_title').text(trec.strTeam)
         var cityEl = $('#city').text(trec.strStadiumLocation+", "+trec.strCountry);
         var sinceEl = $('#since').text("Since "+trec.intFormedYear);
         $('#city_info').append(cityEl, sinceEl);
         
        // var descEl = 
         $('#team_desc').text(trec.strDescriptionEN);
        // teamContEl.append(descEl);
        
        //var badgeEl = 
        $('#badge').attr('src',trec.strTeamBadge)
        //var bannerEl =
         $('#banner').attr('src',trec.strTeamBanner)
        //var jerseyEl = 
        $('#jersey').attr('src',trec.strTeamJersey)
        //teamContEl.append(logoEl, badgeEl, bannerEl, jerseyEl)

        //var stadiumEl = 
        $('#team_stadium').text(trec.strStadium);
        //var stadiumLocEl = 
        $('#stadium_loc').text(trec.strStadiumLocation);
       // var stadiumDesc = 
        $('#stadium_desc').text(trec.strStadiumDescription);
       // teamContEl.append(stadiumEl, stadiumLocEl, stadiumDesc);
        //var stadiumThumbEl = 
        $('#stadium_thumb').attr('src', trec.strStadiumThumb)
    
}
function dispTeamEvents(eventDB){
    var erec;   var tbodyEl = $('#events');
    var trEl;   var tdEl;
    for(var i=0; i<eventDB.length; i++){
        erec = eventDB[i];
        tdEl = $('<td>').text(erec.dateEvent);
        trEl = $('<tr>').append(tdEl);
        tdEl = $('<td>').text(erec.strSeason);
        trEl.append(tdEl);
        tdEl = $('<td>').text(erec.strEvent);
        trEl.append(tdEl);
        tdEl = $('<td>').text(erec.intHomeScore);
        trEl.append(tdEl);
        tdEl = $('<td>').text(erec.intAwayScore);
        trEl.append(tdEl);
       // tdEl = $('<td>').text(erec.strEventAlternate);
        //trEl.append(tdEl);
        tbodyEl.append(trEl);
    }
}
//getTeams();       /// Do't to get whole record here. Individual team record is stored in sessionStorage on the index.html page
getParams();

