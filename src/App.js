import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Display from './Display/Display';
import classes from './App.css'

class App extends Component {
    
    /*
    Session: Fixed time for session length
    Rest: Fixed time for break length
    pause: boolean to check if the timer is paused or not
    pomo: False: timer is currently on session True: timer is currently on break
    counter: the current countdown being display
    */
    state = {
        session: 5,
        rest: 5,
        pause: true,
        pomo: false,
        counter: 5
    }

    //Function to convert number to hh:mm format
    secondsToHms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
        );
    }

    //Function that increments session or break, also validates that the timer is stopped before incrementing
    incrementTimeHandler = (clock) => {
        switch (true) {
            case clock === 'session' && this.state.pause === true && this.state.pomo === false:
                this.setState({
                    session: this.state.session + 1,
                    counter: this.state.session + 1
                })
                break;
            case clock === 'session' && this.state.pause === true && this.state.pomo === true:
                this.setState({
                    session: this.state.session + 1
                })
                break;
            case clock === 'break' && this.state.pause === true && this.state.pomo === true:
                this.setState({
                    rest: this.state.rest + 1,
                    counter: this.state.rest + 1
                });
                break;
            case clock === 'break' && this.state.pause === true && this.state.pomo === false:
                this.setState({
                    rest: this.state.rest + 1
                });
                break;
            default:
                break;
        }
    }

    //Function that handles decreasing session or break, also validates that it won't go below 0 and that the timer is stopped before decreasing
    decreaseTimeHandler = (clock) => {
        switch (true) {
            case clock === 'session' && this.state.pause === true && this.state.pomo === false && this.state.session > 0:
                this.setState({
                    session: this.state.session - 1,
                    counter: this.state.session - 1
                })
                break;
            case clock === 'session' && this.state.pause === true && this.state.pomo === true && this.state.session > 0:
                this.setState({
                    session: this.state.session - 1
                })
                break;
            case clock === 'break' && this.state.pause === true && this.state.pomo === true && this.state.rest > 0:
                this.setState({
                    rest: this.state.rest - 1,
                    counter: this.state.rest - 1
                });
                break;
            case clock === 'break' && this.state.pause === true && this.state.pomo === false && this.state.rest > 0:
                this.setState({
                    rest: this.state.rest - 1
                });
                break;
            default:
                break;
        }
    }

    //setInterval for the current timer
    timer = () => {
        this.interval = setInterval(() => {
            console.log(this.state);

            this.setState({ counter: this.state.counter - 1 });

            //When the timer goes below 0 alternate between session and break depending on the current one
            if (this.state.counter < 1) {
                if (this.state.pomo) {
                    clearInterval(this.interval)
                    this.setState({ counter: this.state.session });
                    this.setState({ pomo: false });
                    this.timer();
                }
                else if (!this.state.pomo) {
                    clearInterval(this.interval);
                    this.setState({ counter: this.state.rest });
                    this.setState({ pomo: true });
                    this.timer();
                }
            }
        }, 1000)


    }

    //Function to handle pause
    timerHandler = () => {
        if (this.state.pause) {
            this.timer();
            this.setState({ pause: false });
        }

        else if (!this.state.pause) {
            clearInterval(this.interval);
            this.setState({ pause: true })
        }
    }

    render() {

        return (
            <div className={classes.container}>
                <Display time={this.secondsToHms(this.state.counter)} />
           
                <Button clicked={() => this.timerHandler()}>{this.state.pause ? 'Play' : 'Pause'}</Button>
                <h1>Session:</h1>
                <Modal
                    type={'Session'}
                    digit={this.state.session}>
                    <Button clicked={() => this.decreaseTimeHandler('session')}>-</Button>
                    {this.state.session}
                    <Button clicked={() => this.incrementTimeHandler('session')}>+</Button>
                </Modal>
                <h1>Break:</h1>
                <Modal
                    type={'Break'}
                    digit={this.state.rest}>
                    <Button clicked={() => this.decreaseTimeHandler('break')}>-</Button>
                    {this.state.rest}
                    <Button clicked={() => this.incrementTimeHandler('break')}>+</Button>
                </Modal>
            </div>
        );
    }
}

export default App