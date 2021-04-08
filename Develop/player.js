
let playerSt = [];    
var teamId = "";
var teamInput = $('#team_Input')
var playerInput = $('#player_input')

  
var requestUrl = 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=' + teamInput + '&p= ' + playerInput ;




function getParams() {
    var searchParamsArr = document.location.search.split('&');
    var team = searchParamsArr[0].split('=').pop();
    var player = searchParamsArr[1].split('=').pop();
    getPlayers(team, player);
  }




    var requestUrl = 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=Toronto_Raptors&p=Kyle_Lowry';

    


    function getPlayers(team, player) {   /// Not used on this page
        var requestUrl = 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t='+team+'&p='+player;
        console.log(requestUrl);

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            playerSt = data.player[0];
            console.log("playerSt: ", playerSt );

            if(data.player == null){
                alert("No data available for the given criteria.");
                window.history.back();
                return false;
            }


            var playerBrith = playerSt.strBirthLocation
            $('#city_birth').append("Born: " + playerBrith)
            var playerName = playerSt.strPlayer
            $('#player-name').append(playerName)
            var playerHT = playerSt.strHeight
            $('#height').append("Height: " + playerHT)
            var playerWT = playerSt.strWeight
            $('#weight').append('Weight: ' + playerWT)
            var playerGn = playerSt.strGender
            $('#gender').append("Gender: " + playerGn,)
            var playerDes = playerSt.strDescriptionEN
            $('#about_player').append("About " + playerName)
            $('#player_desc').append(playerDes)
            var playerTeam = playerSt.strTeam
            $('#player_team').append(playerTeam)
            var playerPic = playerSt.strThumb
            $('#player_pic').attr('src', playerPic)
            
            
            console.log(playerPic)
        })


       
    }
    getParams();