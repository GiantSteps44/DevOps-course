# Test if beckend service1 works and responses JSON

GET http://localhost:8197/back1
HTTP 200

[Asserts]
header "Content-Type" == "text/plain"
