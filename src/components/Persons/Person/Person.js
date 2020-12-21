//import React from 'react';
import React, { Component, Fragment } from "react";
import Aux from "../../../hoc/Aux";
import classes from "./Person.module.css";
import withClass from "../../../hoc/withClass";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  //!2nd way of using ref - you need a constructor to put React.createRef()
  constructor(props) {
    super(props);
    //So create ref is a method offered on the React object we're importing
    this.inputElementRef = React.createRef();
  }
  //!contextType for Class-Based components
  //added another way of using context. You can add a special static property named contextType.
  //static property means that it can be accessed from outside without the need to instantiate an object based on this class first and React will access contextType for you,
  static contextType = AuthContext;
  //Now this allows React to automatically connect this component here, this class-based component to your context behind the scenes and it gives you a new property in this component, the this context property.

  componentDidMount() {
    //!1st way of using ref
    // this.inputElement.focus();

    //!2nd way of using ref - you need a constructor to put React.createRef()
    this.inputElementRef.current.focus();

    //! contextType - this class-based component to your context behind the scenes and it gives you a new property in this component, the this context property
    console.log(this.context.authenticated);
    //context, it has to be written like this because this is given to you by React automatically
    //This allows us to get access to our context even in places like componentDidMount where we previously couldn't.
  }
  render() {
    //! Part of 3 lifecycle render()
    console.log("[Person.js] rendering...");
    return (
      <Fragment>
        <Aux>
          {/* <AuthContext.Consumer>
          {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
        </AuthContext.Consumer> */}
          {/* //!contextType */}
          {this.context.authenticated ? (
            <p>Authenticated!</p>
          ) : (
            <p>Please log in</p>
          )}

          <p onClick={this.props.click}>
            I'm {this.props.name} and I am {this.props.age} years old!
          </p>
          <p key="i2">{this.props.children}</p>
          <input
            key="i3"
            //!2nd way of using ref - you need a constructor to put React.createRef()
            ref={this.inputElementRef}
            //!1st way of using ref
            //!ref, just like key, is a special property you can pass into any component, it is detected and understood by React.

            //1st way of using ref
            //   ref={(inputEl) => {this.inputElement = inputEl}}
            //you can add a new property to your class, so not to your state but really just to the class by using this, then any name of your choice
            //we're getting access to the input element here and then we're storing this in a global property,
            //ref, just like key, is a special property you can pass into any component, it is detected and understood by React.
            type="text"
            onChange={this.props.changed}
            value={this.props.name}
          />
        </Aux>
      </Fragment>
    );
  }
}

// Javascript object and prop types is a special property which you add to any Javascript object or any Javascript component object.
// React will watch out for in development mode and give you a warning if you then pass in incorrect props.

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};
//This should now be a Javascript object and prop types is a special property which you add to any Javascript object or any Javascript component object, I should say, that React will watch out for in development mode and give you a warning if you then pass in incorrect props.

export default withClass(Person, classes.Person);
