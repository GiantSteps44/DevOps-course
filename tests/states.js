// In-memory store for variables
var my_variable = 'INIT';


var allowedStates = ['INIT','RUNNING','SHUTDOWN','PAUSED']

// Handle GET and PUT requests
function handleState(r) {
    if (r.method === 'GET') {
        // Handle GET request: Return the current value of the variable
        r.return(200, my_variable + "\n");
    } else if (r.method === 'PUT') {
        // Handle PUT request: Update the variable with request payload
        r.on('data', function(chunk) {
            if (allowedStates.includes(chunk.toString())) {
                variables.my_variable = chunk.toString();
            } else {
                r.return(400, "State not allowed\n");
            }   
        });

        r.on('end', function() {
            r.return(200, `my_variable updated to: ${variables.my_variable}\n`);
        });
    } else {
        // Handle unsupported methods
        r.return(405, "Method Not Allowed\n");
    }
}
