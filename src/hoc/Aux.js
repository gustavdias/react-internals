//import React from 'react';
//we now don't even need the React import here because we're not using any JSX in here,

const aux = props => props.children;
//children will refer to all the content inside <Aux> in Person.js, and all the aux component does is it outputs that content.
//Now you might argue but isn't is a set of adjacent elements in this place then.
//It kind of is you could say but actually, it isn't because the requirement of having this wrapping top level element is a pure technical one from a Javascript point of view that you must only return one expression and that is what we're doing here because you must never forget that these JSX elements are always calls to React create element and in a return statement, you couldn't return multiple React create element calls like this next to each other and therefore you can't do this either for JSX code.
//But the moment you wrap this with one React create element call so to say, this works and then here in the aux component, you're just returning an input, so technically from a Javascript point of view, that is fine, we're only returning one expression here.
export default aux;