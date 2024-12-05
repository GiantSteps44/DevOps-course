
// In-memory store for variables

var allowedStates = ['INIT','RUNNING','SHUTDOWN','PAUSED']

// Handle GET and PUT requests


function handleState(r) {
    // In-memory store for state variable
    let state = ngx.shared.my_zone.get('State');
    if (state == undefined) {
        ngx.shared.my_zone.set('State', 'INIT');
        state = ngx.shared.my_zone.get('State');
    }

    if (r.method === 'GET') {
        // Handle GET request: Return the current value of the variable
        r.return(200, state + "\n");
    
    } else if (r.method === 'PUT') {
        // Handle PUT request: Update the variable with request payload
        state = r.requestText;
            // Check if the body is in an allowed state
        if (allowedStates.includes(state)) {
            ngx.shared.my_zone.set('State', state);
            r.return(200, "State updated to: " + state + "\n");
        
        } else{
            r.return(405, "Improper state\n");
        }
            
        
    } else {
        // Handle unsupported methods
        r.return(405, "Method Not Allowed\n");
    }
}
export default { handleState }