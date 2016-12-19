require 'sinatra'
require 'sendgrid-ruby'

get '/' do 
   erb :home	
end

get '/products' do
   erb :products
end

get '/about' do
   erb :about
end

get '/contact' do
   erb :contact
end

get '/orders' do
   erb :orders
end

post '/thankyou' do
	puts params
	@name = params[:name]
	@email = params[:email]
	@message = params[:message]

	from = SendGrid::Email.new(email: @email)
	subject = "#{@name} has reached out to you on your site!"
	to = SendGrid::Email.new(email: 'backwardsxmarathon@gmail.com')
	content = SendGrid::Content.new(type: 'text/plain', value: @message)

	mail = SendGrid::Mail.new(from, subject, to, content)

	sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])

	# send the email
	response = sg.client.mail._('send').post(request_body: mail.to_json)
	# display the response status code and body
	puts response.status_code
	puts response.body
	erb :thankyou
end
