# Test GET /run-log endpoint request and that it responses time text/plain

GET http://localhost:8197/run-log
HTTP 200

[Asserts]
header "Content-Type" == "text/plain"
body contains /2024-12-[1-3][0-9]T[0-2][0-9].[0-6][0-9]:[0-9][0-9].[0-9][0-9][0-9]z:/