## Test if nginx authorization page emerges.
## Response should be authorization text

GET http://localhost:8197/login/
HTTP 401

[Asserts]
header "Content-Type" == "text/html"
xpath "string(//head/title)" contains "Authorization"