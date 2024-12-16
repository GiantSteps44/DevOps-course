## Test PUT /state
## 

GET http://localhost:8197/state

HTTP 200
[Asserts]
header "Content-Type" == "text/plain"
[Captures]
my_body: body


PUT http://localhost:8197/state
Content-Type: text/plain
`RUNNING`


HTTP 200
[Asserts]
header "Content-Type" == "text/plain"
[Captures]
my_body: body

PUT http://localhost:8197/state
Content-Type: text/plain
`WRONG STATE`


HTTP 405
[Asserts]
header "Content-Type" == "text/plain"
[Captures]
my_body: body

 