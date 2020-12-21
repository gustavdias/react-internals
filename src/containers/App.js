import React, { Component } from "react";
import withClass from "../hoc/withClass";
// withClass with lower case Because we'll not use this as a component anymore
import classes from "./App.module.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import Aux from "../hoc/Aux";
import AuthContext from "../context/auth-context";

class App extends Component {
  //when you add a constructor, you have to add super(props) to execute the constructor of the component you are extending.
  //!1st render lifecycle constructor
  //(runs just once to set the initial state - this.state = {}, after should use this.setState)
  // Call super (props)
  // Do: Set up State
  // Don’t: Cause Side-Effects

  constructor(props) {
    super(props); //will execute the constructor of the class that you are extending
    console.log("1.[App.js] constructor");

    //You can initialize your state inside of the constructor, the state outside here is just a modern syntax that does the same
  }

  state = {
    persons: [
      // { id: "asfa1", name: "Max", age: "28" }, if you pass "28" you will break the prop types

      { id: "asfa1", name: "Max", age: 28 },
      { id: "vasdf1", name: "Manu", age: 29 },
      { id: "asdf11", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
  };
  //!2nd render & 1st re-render() lifecycle - getDerivedStateFromProps: it is a static and you pass props and state
  //static method because you don't want the user to access the "this" keyword directly inside the method
  //because static methods are actually class method, not instance methods
  //you can't directly setState using this.setState (protects you from doing mistakes)
  //it returns newState or null
  //rarely used
  static getDerivedStateFromProps(props, state) {
    console.log("2.[App.js] getDerivedStateFromProps", props);
    return state;
  }

  //? getDerivedStateFromProps - old component not in use - for preparing your state correctly, now you do it on getDerivedStateFromProps
  //? Or if you want ot set some initial state based on props,now you use the constructor
  // componentWillMount() {
  //   console.log('Old!!! [App.js] componentWillMount');
  // }

  //! 4th render lifecycle - componentDidMount
  // Do: Cause Side-Effects (That is a typical hook you would use for making an HTTP request to get new data from the web.)
  // Don’t: Update State
  // (triggers re-render)
  //Side effect is relatively abstract, in the end it means things like sending a HTTP request or storing something in your local storage of the browser or sending some analytics to Google analytics. You don't really want to do things like that in the constructor because that can impact performance and cause unnecessary re-render cycles
  //If you are using a 3rd party library
  //You use to notify that the dome is ready, so you cna make changes accordantly
  componentDidMount() {
    console.log("4.[App.js] componentDidMount");
  }

  //! 2nd re-render (update) lifecycle - allows you to cancel the updating process.
  //May cancel the updating process! For preventing unnecessary update circles (performance improve)
  // DO: Decide whether to
  // Continue or Not
  // DON‘T: Cause Side-Effects

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true; //if false the component does not update
  }

  //! 4th re-render (update) lifecycle - It means that it is done with the updating, that the render method has been executed and here you can now cause side effects
  //it is the equivalent to componentDidMount
  //It means that it is done with the updating, that the render method has been executed and here you can now cause side effects
  //DO: Cause Side-Effects
  // DON‘T: Update State
  // (triggers re-render)
  //you'll have to watch out to not enter an infinite loop here if you make an HTTP request and you get back a response and you then update your component and then this cycle starts again

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    //!S7L108 - Setting State Correctly
    //when you're doing state updates that don't depend on the old state, there is nothing wrong with just passing the object,
    // this.setState((prevState){
    //   persons:persons,
    //   changeCounter: this.state.changeCounter +1
    // });
    // }
    //With the change counter however, you should use that optional syntax where you actually receive two arguments and I'm using an anonymous arrow function
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  //! 3rd render & 3rd re-render lifecycle - Prepare & Structure your JSX Code - The main render() will call all renders from child components
  //So every child component you included in your rendered component will then be rendered as well and only once all child components were rendered and that their lifecycle looks finished componentDidMount() will be called.
  //mandatory, where you return your JSX
  //you can't use setState here, or else you will go on a infinite loop
  render() {
    console.log("3.[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider
          //so we'll still manage the authentication status in my state of this component because one thing does not change when you use context, React will re-render when state or props change. So only changing something in a context object would not cause a re-render cycle and therefore this is not enough.
          value={{
            //outer curly braces are there to enter dynamic content, inner curly braces construct Javascript object
            authenticated: this.state.authenticated,
            login: this.loginHandler,
            //Now this is in my context object that can now be accessed from cockpit and persons because they are inside of the provider wrapper.
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              //! With React.memo() it updates if any props in Cockpit.js changes, to be more specific, with only :
              //props.showPersons
              //props.personsLength
              //To fix that, we can optimize the way we pass data into our cockpit
              //persons={this.state.persons}//instead of passing just persons, you pass {this.state.persons.length}
              //So instead of determining the length inside of the cockpit, we do it outside of the cockpit
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />
          ) : null}
          {persons}
          {/* So now inside of the cockpit and of persons, we'll be able to interact with our context and also in the app.js file because here I'm setting up this provider component. */}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
//classes referring to our CSc modules classes.
