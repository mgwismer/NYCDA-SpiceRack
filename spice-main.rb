require 'sinatra'
require 'sendgrid-ruby'

from = SendGrid::Email.new(email: 'test@example.com')
subject = "Hello there! Please open my email."
to = SendGrid::Email.new(email: 'margaretgwismer@gmail.com')

content = SendGrid::Content.new(type: 'text/plain', value: 'Hello, Email!')

mail = SendGrid::Mail.new(from, subject, to, content)

sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])

# send the email
response = sg.client.mail._('send').post(request_body: mail.to_json)
# display the response status code and body
puts response.status_code
puts response.body	
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

get '/order' do
   erb :order
end

get 'favicon.ico' do
	"Hello world"
end

post '/thankyou' do
	erb :thankyou
end