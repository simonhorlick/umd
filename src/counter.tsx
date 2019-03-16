import * as React from "react";
import * as Rx from "rxjs";
import { reduce, map, scan } from 'rxjs/operators';

interface CounterState {
  counter: number;
}

export class Counter extends React.Component<{}, CounterState> {

  // onButtonClick is a sink that expects a '1' every time the button is
  // clicked.
  onButtonClick: Rx.Subject<number>;

  subscription: Rx.Subscription;

  constructor(props: {}) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.onButtonClick = new Rx.Subject();
    this.subscription = Rx.Subscription.EMPTY;
  }

  componentDidMount() {
    this.subscription = this.onButtonClick
      .pipe(scan((acc, val) => acc + val))
      .subscribe(val => this.setState({ counter: val }));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  click() {
    this.onButtonClick.next(1);
  }

  render() {
    return (<div>
      <button onClick={() => this.click()}>{this.state.counter}</button>
    </div>);
  }
}