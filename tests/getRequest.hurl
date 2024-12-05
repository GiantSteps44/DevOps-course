# Test GET /request endpoint request and that it responses text/plain

GET http://localhost:8197/request
HTTP 200

[Asserts]
header "Content-Type" == "text/plain"