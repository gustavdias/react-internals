// import React, {Component} from 'react';
import React, { PureComponent } from "react"; //just a normal component that already implements shouldComponentUpdate with a complete props check

import Person from "./Person/Person";
// import AuthContext from "../../context/auth-context";

//const persons = (props) => {
// class Persons extends Component {

//! PureComponents instead of shouldComponentsUpdate
// If you need just to implement a check where you simply want to compare
//if all props that matter to a component for difference, you can use PureComponent

class Persons extends PureComponent {
  //!2nd render & 1st re-render() lifecycle - getDerivedStateFromProps: it is a static and you pass props and state
  //static method because you don't want the user to access the "this" keyword directly inside the method
  //because static methods are actually class method, not instance methods
  //you can't directly setState using this.setState (protects you from doing mistakes)
  //it returns newState or null
  //rarely used
  //!Error!!!!!!!!!
  static getDerivedStateFromProps(props, state) {
    console.log("[Persons.js] getDerivedStateFromProps");
    return state;
  }

  //!componentWillReceiveProps
  //could have used that for updating some internal state but it was easy to use this incorrectly and therefore you shouldn't use it anymor
  //get the props you are getting for this update.
  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  //!2nd render & 1st re-render() lifecycle - shouldComponentUpdate:
  //May cancel the updating process! For preventing unnecessary update circles (performance improve)
  //allows you to cancel the updating process.
  //*You have to return true if React should continue updating or false if it shouldn't
  //!Error on console because of it!!!!!!!!!

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Persons.js] shouldComponentUpdate");
    //!Using shouldComponentUpdate for Optimization
    // return true;//if something changes on App.js, even if nothing changes on Persons.js, if it returns true, the component will update
    //Still here, we see persons shouldComponentUpdate, persons rendering, every single person renders, getSnapshotBeforeUpdate, persons componentDidUpdate, so all our persons updating hooks ran even though in persons, nothing changed
    //?we can prevent this by simply checking what changed in shouldComponentUpdate here in persons.js
    //so you can check the props coming to Persons.js
    //new props is different from current set.
    if (
      //PureComponent - before was only:
      // nextProps.persons !== this.props.persons
      //update this if check here to check whether persons is different or if next props changed is different to this props changed
      //if you have such a scenario where you check all the props of a given component like below
      nextProps.persons !== this.props.persons ||
      nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked
      //you have to do like this, coping the state, because they are arrays (reference type)
    ) {
      return true;
    } else {
      return false;
    }
    //Re-rendering - allows you to see what really gets re-rendered because it's highlighted with a green look then.
    // Chrome => more tools => rendering enable paint flashing
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log('[Persons.js] shouldComponentUpdate');
  //     return true;
  //   }

  // If you are having a class-based component, so a component created with the class keyword
  // extending component, where you implement shouldComponentUpdate

  //! 4th re-render() lifecycle - getSnapshotBeforeUpdate
  //you can leave the user in the same position that he was before the DOM Update.
  //Ex.: to remember a scrolling position of a user, so he can’t stay at the same place after a re-render().
  //mount really happens after this part
  //if you need to do something just before it is mounted
  //The reason for this method is that react introduced lazy loading (async rendering)
  //ex.; user scrolls or change the size of do window - so you can remember it
  // DO: Last-minute DOM ops
  // DON‘T: Cause Side-Effects
  // returns a snapshot object which you can freely configure

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return { message: "Snapshot!!!!!!!!!!!!!!!!!!" }; //that snapshot is a data package so to say which you then receive in componentDidUpdate, so that you can save some state right before the update,
  }
  //!componentWillUpdate
  //ran right before componentDidUpdate
  // componentWillUpdate() {

  // }

  //! 5th re-render() lifecycle - componentDidUpdate
  //It means that it is done with the updating, that the render method has been executed and here you can now cause side effects
  // DO: Cause Side-Effects
  // DON‘T: Update State
  // (triggers re-render)

  //!componentDidUpdate (done)
  //is the equivalent to componentDidMount
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate");
    console.log(snapshot); //that snapshot is a data package so to say which you then receive in componentDidUpdate, so that you can save some state right before the update,
  }

  //!componentWillUnmount - for cleaning up
  //outside render and re-render
  //when component dies
  //if you want ot do something just before it unmount, any code that you want to run before it is removed

  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }

  //! Part of the 3 lifecycle render()
  //!Duplicated render() - we have to forward something which we don't need in this component. So there is a better way
  // render() {
  //   console.log("[Person.js] rendering...");
  //   return (
  //     <AuthContext.Consumer>
  //       //It is with context that you get access to that context object here in
  //       the place where we consume it.
  //       {(context) =>
  //         this.props.persons.map((person, index) => {
  //           return (
  //             <Person
  //               click={() => this.props.clicked(index)}
  //               name={person.name}
  //               key={person.id}
  //               age={person.age}
  //               changed={(event) => this.props.changed(event, person.id)}
  //               isAuth={this.props.isAuthenticated}
  //             />
  //           );
  //         })
  //       }
  //     </AuthContext.Consumer>
  //   );
  // }

  //! Part of the 3 lifecycle render()

  render() {
    console.log("[Persons.js] rendering...");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

//export default persons;
export default Persons;
