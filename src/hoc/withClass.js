import React from "react";

//! 1st style is better for CSS - It is a Functional component
//my higher order component, withClass, that simply does one thing, it sets up a class on a div that wraps my component.
// const withClass = props => (
//   <div className={props.classes}>{props.children}</div>
// );
//This one you use as a component and it is Capital letter <WithClass>

//! 2nd style is better for logic - It isn't a component, it is just a regular JS function
//another way to build a HOC
//does not work by returning a functional component here but instead by using a regular Javascript function where the first argument will actually be our wrapped component
//!st It can be any name, but it must start with Capital letters
//! 2nd argument then is something that you need in your higher order component
const withClass = (WrappedComponent, className) => {
  return (
    props //I have a function that returns a function and the function that I return is a functional component. In that functional component,
  ) => (
    <div className={className}>
      {/*!!!!!!!! passing unknown props dynamically */}
      {/* props={props} will not work because React automatically takes all the attributes you add to your JSX code and combines them in a props object. */}
      <WrappedComponent {...props} />
      {/* without props the data will be missing - we can pass props dynamically. 
      spread operator pulls out all the properties that are inside of this props 
      object and distributes them as new key-value pairs on this wrapped component.
      So now props would not replace that props object but be added as a single property 
      in the props passed to the wrapped component*
      spread operator*/}
    </div>
  );
};
export default withClass;
//! Low case Because we'll not use this as a component anymore because well, it isn't a component anymore, it's a normal function, a function that returns a component function but not a component itself.
//in this file, I have no functional component, that I have a normal function in there instead.
