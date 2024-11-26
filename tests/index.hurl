# Test if index page with buttons works

GET http://localhost:8197/
HTTP 200

[Asserts]
header "Content-Type" == "text/html"
[Captures]
my_body: body