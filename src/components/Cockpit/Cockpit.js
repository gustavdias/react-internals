import React, { useEffect, useRef, useContext } from "react";
import classes from "./Cockpit.module.css";
import AuthContext from "../../context/auth-context";

const Cockpit = (props) => {
  //!ref with useRef - using ref in functional components
  const toggleBtnRef = useRef(null); //you can pass a initial value here
  //!useContext
  const authContext = useContext(AuthContext);
  //So now authContext will be a constant that holds information about your authContext data.
  console.log(authContext.authenticated);

  //!1st useEffect() is componentDidMount and componentDidUpdate combined
  //useEffect() takes a function that will run in every user cycle
  useEffect(() => {
    console.log("1st [Cockpit.js] useEffect");
    // Http request...
    const timer = setTimeout(() => {
      alert("Saved data to cloud!");
    }, 1000);

    //!ref with useRef - using ref in functional components
    //use in useEffect() because it runs after every render() cycle.
    toggleBtnRef.current.click();

    //! clean up with a return inside useEffect
    // If you're using hooks like we're doing in the cockpit.js file, then you also can use useEffect for this cleanup work.
    // It runs BEFORE the main useEffect function, but AFTER the (first) render cycle.
    //If you want ot do any clean up, you do in return:
    return () => {
      clearTimeout(timer); //if you clean up the cockpit before the timeout, the alert will never be shown.
      console.log("1st [Cockpit.js] cleanup work in useEffect");
    };
  }, []);
  //[props.persons] useEffect() updates only when props.persons change
  //[] if we now only want to execute this when the component renders the first time (it runs only the first time)
  //that second argument is an array where you simply point at all the variables or all the data that actually are used in your effect.
  //This tells React this effect has no dependencies and it should rerun whenever one of the dependencies changes.

  //! 2nd useEffect() useEffect basically combines the functionality of all these class-based lifecycle hooks in one
  useEffect(() => {
    console.log("2nd [Cockpit.js] 2nd useEffect");
    return () => {
      console.log("2nd [Cockpit.js] cleanup work in 2nd useEffect");
    };
  });

  // useEffect();

  const assignedClasses = [];
  let btnClass = "";
  //props.showPersons
  //props.personsLength
  //the only thing that the cockpit uses internally and that therefore should trigger a re-rendering of that cockpit are
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  //! With React.memo() it updates if any props in Cockpit.js changes, to be more specific, with only :
  //props.showPersons
  //props.personsLength
  //To fix that, we can optimize the way we pass data into our cockpit
  //you use props.personsLength instead of props.persons.length
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      {/* props.title- the only thing that the cockpit uses internally and that therefore should trigger a re-rendering of that cockpit are */}
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      {/* //!ref with useRef - using ref in functional components */}
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      {/* <AuthContext.Consumer>
      {(context) => <button onClick={context.login}>Log in</button>}
      </AuthContext.Consumer> */}
      {/* //! useContext() */}
      <button onClick={authContext.login}>Log in</button>
    </div>
  );
};

//! React.memo()
//to prevent this unnecessary re-rendering
//export default Cockpit;
export default React.memo(Cockpit); //you can warp your entire component here
//React will memorize (memorization), it will store a snapshot of the component and
//!only if the input changes(if props changes), it will update
