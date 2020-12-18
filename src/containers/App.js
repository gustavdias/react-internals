import React, { Component } from 'react';
import withClass from '../hoc/withClass';
// withClass with lower case Because we'll not use this as a component anymore
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';



class App extends Component {
  //when you add a constructor, you have to add super(props) to execute the constructor of the component you are extending.
  //!1 lifecycle
  constructor(props) {
    super(props); //will execute the constructor of the class that you are extending
    console.log('[App.js] constructor');

    //You can initialize your state inside of the constructor, the state outside here is just a modern syntax that does the same
  }

  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
  };
//!2 lifecycle: it is a static and you pass props and state
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  //old component not in use
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };
  
//! 3 lifecycle
  render() {
    console.log('[App.js] render');
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
          value={{//outer curly braces are there to enter dynamic content, inner curly braces construct Javascript object
            authenticated: this.state.authenticated,
            login: this.loginHandler
            //Now this is in my context object that can now be accessed from cockpit and persons because they are inside of the provider wrapper.
          }}
        >

        {this.state.showCockpit ? (
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
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
//classes referring to our CS modules classes.
