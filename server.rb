require 'sinatra'
require 'json'
require 'pusher'

Pusher.app_id = '119859'
Pusher.key = '76abfc1ad02da9810a9d'
Pusher.secret = '07c4c701b5d1c864459d'

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
	[{id:  1, player1: 'Boguste', player2: 'Dimitri'},
	 {id: 2, player1: 'Boguste', player2: 'Keith'}].to_json
end

post '/pusher/auth' do
	response = Pusher[params[:channel_name]].authenticate(params[:socket_id])	
	puts response
	response.to_json
end