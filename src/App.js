import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Display from './Display/Display';
import classes from './App.css'

class App extends Component {
    state = {
        session: 5,
        rest: 5,
        pause: true,
        pomo: false,
        counter: 5
    }

    secondsToHms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
        );
    }

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

    timer = () => {
        this.interval = setInterval(() => {
            console.log(this.state);

            this.setState({ counter: this.state.counter - 1 });

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
                <Modal
                    type={'Session'}
                    digit={this.state.session}>
                    <Button clicked={() => this.decreaseTimeHandler('session')}>-</Button>
                    <Button clicked={() => this.incrementTimeHandler('session')}>+</Button>
                </Modal>
                <Modal
                    type={'Break'}
                    digit={this.state.rest}>
                    <Button clicked={() => this.decreaseTimeHandler('break')}>-</Button>
                    <Button clicked={() => this.incrementTimeHandler('break')}>+</Button>
                </Modal>
            </div>
        );
    }
}

export default App