var React = require('react'),
    gameStore = require('./gamestore'),
    ActionButtons = require('./actionbuttons.jsx'),
    GameListings = require('./gameListings.jsx'),
    StandingsTable = require('./standingsTable.jsx'),
    DashboardHeader = require('./dashboardHeader.jsx');

React.render(<ActionButtons/>, document.getElementById('actions'));
React.render(<div><DashboardHeader /></div>, document.getElementById('banners'));
React.render(<GameListings />, document.getElementById('gameListings'));
React.render(<StandingsTable />, document.getElementById('standings'));

