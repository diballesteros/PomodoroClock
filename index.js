/* class App extends React.Component {
    state = {
        calculate: []
    }

    render() {

        return (
            <div>
                
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root')); */

// Set the date we're counting down to
let session = 5;
let rest = 5;

let pause = true;
let pomo = false;

let clock;

// Update the count down every 1 second
let timer = (current) => setInterval(function () {

    // Find the session between now an the count down date
    current = current - 1;

    // Display the result in the element with id="demo"

    display(current);
    // If the count down is finished, write some text 
    if (current < 1) {
        if(pomo){
            clearInterval(timer);
            session = 25;
            pomo = false;
            clock = timer(rest);
        }
        else if(!pomo){
            clearInterval(timer);
            rest = 5;
            pomo = true;
            clock = timer(session);
        }
    }
}, 1000);

document.getElementById("PAUSE").onclick = function () {
    if (pause && pomo) {
        clock = timer(session);
        pause = false;
    }else if (pause && !pomo){
        clock = timer(rest);
        pause = false;
    }
    else if (!pause) {
        clearInterval(clock);
        pause = true;
    }

}
document.getElementById("sessionIncrement").onclick = function () {
    if (pause) {
        session = session + 1;
        display(session);
    }

}

document.getElementById("sessionDecrease").onclick = function () {
    if(pause){
        session = session - 1;
        display(session);
    }
}

let display = (current) => {
    document.getElementById("demo").innerHTML = current;
}


display(session);