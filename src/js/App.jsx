var React = require('react'),
    gameStore = require('./gamestore'),
    GameList = require('./gameList.jsx'),
    StandingsTable = require('./standingsTable.jsx'),
    DashboardHeader = require('./dashboardHeader.jsx');

React.render(<div><DashboardHeader /></div>, document.getElementById('banners'));
React.render(<GameList name="Recent Games" games={gameStore.getGames()}/>, document.getElementById('recentResults'));
React.render(<GameList name="Upcoming Games" games={gameStore.getQueue()}/>, document.getElementById('upcomingGames'));
React.render(<StandingsTable /> ,document.getElementById('standings'));

