# foosball

<h2>Pusher Message Definitions</h2>

<h4>client-game:started</h4>
      {
        "id": <int>,
        "player1": <player identifier of some sort>,
        "player2": <player identifier of some sort>,
        "player1Color": <hex color no x (eg FF88A3)>,
        "player2Color": <hex color no x (eg 097912)>,
        "player1Score": <int>,
        "player2Score": <int>
      }
  
<h4>game:ended</h4>
    {
        "id": <int>,
        "player1": <player identifier of some sort>,
        "player2": <player identifier of some sort>,
        "player1Score": <int>,
        "player2Score": <int>
    }
  
<h4>game:goalscored</h4>
    {
        "gameid": <id of game>,
        "player": <"player1" or "player2">
    }

<h4>game:queued</h4>
    {
        "id": <int>,
        "player1": <player identifier>,
        "player2": <player identifier>
    }
