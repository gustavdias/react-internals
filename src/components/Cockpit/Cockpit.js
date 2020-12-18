import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';


const Cockpit = props => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    // setTimeout(() => {
    //   alert('Saved data to cloud!');
    // }, 1000);
    toggleBtnRef.current.click();
    // If you're using hooks like we're doing in the cockpit.js file, then you also can use useEffect for this cleanup work.
    // It runs BEFORE the main useEffect function, but AFTER the (first) render cycle.
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []);
  //if we now only want to execute this when the component renders the first time (it runs only the first time)
  //that second argument is an array where you simply point at all the variables or all the data that actually are used in your effect.
  //This tells React this effect has no dependencies and it should rerun whenever one of the dependencies changes.

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    };
  });

  // useEffect();



  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      {/* <AuthContext.Consumer>
      {(context) => <button onClick={context.login}>Log in</button>}
      </AuthContext.Consumer> */}
      <button onClick={authContext.login}>Log in</button>
    </div>
  );
};

//export default Cockpit;
export default React.memo(Cockpit);