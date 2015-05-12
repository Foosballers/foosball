require 'sinatra'
require 'json'

get '/' do
    File.read('public/index.html')
end

get '/players/standings' do
	[{:player => 'Keith', :wins => 200, :losses => 4},
		{:player => 'Kavin', :wins => 23, :losses => 23},
		{:player => 'Max', :wins => 30, :losses => 29}].to_json
end

get '/games/recent' do 
	[{id: rand(1000), player1: 'Kavin', player2: 'Keith', player1Score: '0', player2Score: '10'},
	 {id: rand(1000), player1: 'Keith', player2: 'Kavin', player1Score: '10', player2Score: '1'}].to_json
end

get '/games/queue' do
	[{id:  rand(10000), player1: 'Boguste', player2: 'Dimitri'}, 
	 {id: rand(10000), player1: 'Boguste', player2: 'Keith'}].to_json
end