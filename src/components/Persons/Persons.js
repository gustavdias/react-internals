// import React, {Component} from 'react';
import React, { PureComponent } from 'react';

import Person from './Person/Person';
// import AuthContext from '../../context/auth-context';


//const persons = (props) => {
// class Persons extends Component {
class Persons extends PureComponent {

  //   static getDerivedStateFromProps(props, state) {
  //     console.log('[Persons.js] getDerivedStateFromProps');
  //     return state;
  //   }

  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log('[Persons.js] shouldComponentUpdate');
  //     if (
  //       nextProps.persons !== this.props.persons ||
  //       nextProps.changed !== this.props.changed ||
  //       nextProps.clicked !== this.props.clicked
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //     // return true;
  //   }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log('[Persons.js] shouldComponentUpdate');
  //     return true;
  //   }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot!' };
  }
  // componentWillUpdate() {

  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  
//! Part of the 3 lifecycle render()
  // render() {
  //   console.log('[Person.js] rendering...');
  //   return <AuthContext.Consumer>

  //     {(context) => this.props.persons.map((person, index) => {
  //       return (
  //         <Person
  //           click={() => this.props.clicked(index)}
  //           name={person.name}
  //           key={person.id}
  //           age={person.age}
  //           changed={event => this.props.changed(event, person.id)}
  //           isAuth={this.props.isAuthenticated}
  //         />)
  //     })}
  //   </AuthContext.Consumer>

  // };

  render() {
    console.log('[Persons.js] rendering...');
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={event => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

//export default persons;
export default Persons;