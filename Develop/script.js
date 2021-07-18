var teamsContainerEl = document.querySelector('#nbaTeams-container');
var teamSearchTerm = document.querySelector('#nbaTeams-search-term');
var userInput = document.querySelector('#team_name');
var tNameEl = $('#team_name');
var teamListEl = $('#team_list');
var playerNameEl = $('#player_name');
var playerBtn = $("#playerBtn");
var teamNameEl = "";  var optionEl = "";
let teamDB = [];
var teamList = [];
var teamNames = [];

function getTeams() {
    var requestUrl = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4387';

    fetch(requestUrl, {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
      })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            teamDB = data;
         
            showTeams();
           // getPlayers()
        });
}
function getPlayers(){ /// Not used 
  
  var requestUrl = 'https://www.balldontlie.io/api/v1/players?search=all';
  //var requestUrl = './players.json';

    fetch(requestUrl, {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
      })
        .then(function (response) {
          console.log(response)
            return response.json();
        })
        .then(function (data) {
           // teamDB = data;
            console.log("playersDB: ", data);
          //  showTeams();
        });
}
function showTeams() {
    //console.log(data.teams[0].strTeam);
    for (var i = 0; i < teamDB.teams.length; i++) {

        // console.log(teamDB.teams[i].strTeam);
        var teamName = (teamDB.teams[i].strTeam);
        var teamid = teamDB.teams[i].idTeam;
        teamList[i] = teamName;
       
        
        tNameEl.append('<option value="' + teamName + '">' + teamName + '</option>');
      
    }
 

    teamNames = teamList;
    //setAutoComplete(teamList)
    setPlayerAutoComplete(players);
}

function searchTeams() {
    // event.preventDefault();
  const teamNameSearch = userInput.value
  var teamIndex = "";
  for(var i = 0; i< teamList.length; i++){
    if(teamNameSearch.toLowerCase() === teamList[i].toLowerCase()){
      teamIndex = i;
      i = teamList.length+1;
    }
  }
  if(teamIndex != ""){
    var teamRecord = teamDB.teams[teamIndex];
    var teamRec = JSON.stringify(teamRecord);
    sessionStorage.setItem("teamRecord", teamRec);
    var queryString = './team.html';        
    location.assign(queryString);
  }else{
    alert("Team name does not exists in NBA league - "+teamNameSearch);
  }
}
playerBtn.on('click', function(event){
  event.preventDefault();
  if(playerNameEl.val() == ""){
    alert("Please enter the NBA player name first.")
    return false;
  }else{
  //  var team = playerTeamEl.val();
    var name = playerNameEl.val();
//    team = team.replaceAll(' ','_');
    name = name.replaceAll(' ','_');
    var team = playerNameTeam[name];
    team = team.replaceAll(' ','_');
    var queryString = './player.html?q=' + team+'&p='+name;         //searchInputVal + '&format=' + formatInputVal;
  
    location.assign(queryString);
  }
})
teamListEl.on('click', function(event){
  event.preventDefault();
  var teamIndex = event.target.dataset.index;
 
  var teamRecord = teamDB.teams[teamIndex];
  var teamRec = JSON.stringify(teamRecord);
  //console.log(teamRec);


  sessionStorage.setItem("teamRecord", teamRec);

  var queryString = './team.html';      ///?q=' + teamIndex+"&teamid="+teamId;         //searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
  /// Call the teamStats function next
})


function setAutoComplete(teamListNames){
    $('#nbaTeam').autocomplete({
      source: teamListNames,
    });
}
function setPlayerAutoComplete(playerList){
  $('#player_name').autocomplete({
    source: playerList,
  });
}


getTeams();

