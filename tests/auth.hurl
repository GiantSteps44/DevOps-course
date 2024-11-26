## Test if authorization html page emerges.

GET http://localhost:8197/auth/
HTTP 401

[Asserts]
header "Content-Type" == "text/html"
xpath "string(//head/title)" contains "Authorization"