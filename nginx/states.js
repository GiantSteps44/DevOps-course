
// define possible states
var allowedStates = ['INIT','RUNNING','SHUTDOWN','PAUSED']


  function setInitState(){
    ngx.shared.my_zone.set('currentState', 'INIT');
    
}
  function setRunningState (r){
    if (ngx.shared.my_zone.get('currentState') == undefined) {
        setInitState();
    }
    let curr = ngx.shared.my_zone.get('currentState');
    ngx.shared.my_zone.set('previousState', curr);
    ngx.shared.my_zone.set('currentState', 'RUNNING');
    stateTransition();
    r.return(200);
  }
  function stateTransition(){
    const now = new Date();
    const isoString = now.toISOString();
    let log = isoString + ": " + ngx.shared.my_zone.get('previousState') + "->" + ngx.shared.my_zone.get('currentState');
    let runLog = ngx.shared.my_zone.get('runLog');
    if (runLog) {
        var runArr = runLog.split(",");
    } else {
        var runArr = [];
    }
    runArr.push(log);
    const LogStr = runArr.toString();
    ngx.shared.my_zone.set('runLog',LogStr);

}

// Handle GET and PUT requests
  function handleState(r) {
    
    // If initial state is not set, then set it
    if (ngx.shared.my_zone.get('currentState') == undefined) {
        setInitState();
    }
    var state = ngx.shared.my_zone.get('currentState');


    if (r.method === 'GET') {
        // Handle GET request: Return the current value of state
        r.return(200, state + "\n");
    

    } else if (r.method === 'PUT') {
        try {
            // Fetch new state from PUT request
            var putState = r.requestText;

                // Check if new state is allowed
            if (allowedStates.includes(putState)) {
                // if so, then update previous state and current state
                ngx.shared.my_zone.set('previousState',state)
                ngx.shared.my_zone.set('currentState', putState);
                stateTransition();
                r.return(200, "State updated to: " + putState + "\n");
            } else {
                r.return(405, "Improper state\n");
            }

        } catch (error) {
            r.return(405, "Error: Improper state "+error.message +"\n");
        }
        
    } else {
        // Handle unsupported methods
        r.return(405, "Method Not Allowed\n");
    }
}
  function getRunLog(r) {
    if (r.method === 'GET') {
        // if there is previous state (and current state)
        // but runLog is undefined then add state
        let runLog = ngx.shared.my_zone.get('runLog');
        if (runLog){
            var runArr = runLog.split(",")
            r.return(200,  runArr.join("\n") + "\n");
        } else {
            r.return(200,  "No state transitions occurred." + "\n");
        }
        
    } else {
        // Handle unsupported methods
        r.return(405, "Method Not Allowed\n");
    }
  }

export default { handleState, getRunLog, setInitState, setRunningState }