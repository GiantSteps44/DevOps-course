# Test if backend service1 works and responses text/plain

GET http://localhost:8197/back1
HTTP 200

[Asserts]
header "Content-Type" == "text/plain"
