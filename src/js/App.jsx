var React = require('react'),
    gameStore = require('./gamestore'),
    GameListings = require('./gameListings.jsx'),
    StandingsTable = require('./standingsTable.jsx'),
    DashboardHeader = require('./dashboardHeader.jsx');

React.render(<div><DashboardHeader /></div>, document.getElementById('banners'));
React.render(<GameListings />, document.getElementById('gameListings'));
React.render(<StandingsTable />, document.getElementById('standings'));

