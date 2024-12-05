
// define possible states
var allowedStates = ['INIT','RUNNING','SHUTDOWN','PAUSED']



// Handle GET and PUT requests
function handleState(r) {
    // In-memory store for previous and current states 
    let state = ngx.shared.my_zone.get('currentState');
    if (state == undefined) {
        ngx.shared.my_zone.set('currentState', 'INIT');
        state = ngx.shared.my_zone.get('currentState');
        ngx.shared.my_zone.set('previousState',"None"); 
    } else {
    }
    
    if (r.method === 'GET') {
        // Handle GET request: Return the current value of the variable
        r.return(200, state + "\n");
    
    } else if (r.method === 'PUT') {
        try {
            ngx.shared.my_zone.set('previousState',state); 
            // Handle PUT request: Update the variable with request payload
            state = r.requestText;
                // Check if the body is in an allowed state
            if (allowedStates.includes(state)) {

                ngx.shared.my_zone.set('currentState', state);
                
                r.return(200, "State updated to: " + state + "\n");
            } else{
                r.return(405, "Improper state\n");
            }
        } catch (error) {
            r.return(405, "Improper state\n");
        }
        
    } else {
        // Handle unsupported methods
        r.return(405, "Method Not Allowed\n");
    }
}
  function getRunLog(r) {
    if (r.method === 'GET') {
        const now = new Date();
        const isoString = now.toISOString();
        let runLog = isoString + ": " + ngx.shared.my_zone.get('previousState') + "->" + ngx.shared.my_zone.get('currentState');
        ngx.shared.my_zone.set('dayTime',runLog);
        let data = ngx.shared.my_zone.get('dayTime');
        r.return(200,  data + "\n");
    } else {
        // Handle unsupported methods
        r.return(405, "Method Not Allowed\n");
    }
  }
export default { handleState, getRunLog }