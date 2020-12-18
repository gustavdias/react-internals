//import React from 'react';
import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import classes from './Person.module.css';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';


class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
//static property means that it can be accessed from outside without the need to instantiate an object based on this class first and React will access contextType for you,
  static contextType = AuthContext;
  //Now this allows React to automatically connect this component here, this class-based component to your context behind the scenes and it gives you a new property in this component, the this context property.

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
    //context, it has to be written like this because this is given to you by React automatically
    //This allows us to get access to our context even in places like componentDidMount where we previously couldn't.
  }
  render() {

    //! Part of 3 lifecycle render()
    console.log('[Person.js] rendering...');
    return (
      <Aux>
        {/* <AuthContext.Consumer>
          {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
        </AuthContext.Consumer> */}
        {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}

        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
            </p>
        <p key="i2">{this.props.children}</p>
        <input
          key="i3"
          ref={this.inputElementRef}
          //   ref={(inputEl) => {this.inputElement = inputEl}}
          //ref, just like key, is a special property you can pass into any component, it is detected and understood by React.
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );

  };
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};
//This should now be a Javascript object and prop types is a special property which you add to any Javascript object or any Javascript component object, I should say, that React will watch out for in development mode and give you a warning if you then pass in incorrect props.

export default withClass(Person, classes.Person);
