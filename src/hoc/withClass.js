import React from 'react';
//my higher order component, withClass, that simply does one thing, it sets up a class on a div that wraps my component.
// const withClass = props => (
//   <div className={props.classes}>{props.children}</div>
// );
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
        <WrappedComponent {...props}/>
        {/* we can pass props dynamically. spread operator pulls out all the properties that are inside of this props object and distributes them as new key-value pairs on this wrapped component.*/}
        </div>
    );
};
export default withClass;
