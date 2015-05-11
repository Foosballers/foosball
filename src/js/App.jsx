var React = require('react'),
    RecentResults = require('./recentResults.jsx'),
    DashboardHeader = require('./dashboardHeader.jsx');

React.render(<div><DashboardHeader /></div>, document.getElementById('banners'));
React.render(<RecentResults/>, document.getElementById('recentResults'));

