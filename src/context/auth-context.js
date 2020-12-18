import React from 'react';

const authContext = React.createContext({
  authenticated: false,
  login: () => {}//if I initialize my default value with everything I want to be able to access on this context from different components in my application, then I actually get better auto-completion from the IDE
});
//Now React create context actually allows us to initialize our context with a default value because what the context in the end is is a globally available Javascript object
//though globally available is not entirely correct, you decide where it is available. But it is a Javascript object that can be passed between React components without using props, behind the scenes so to say. So you can initialize as with any value you want.
//It doesn't need to be an object. It can be a string, a number, an array, or a context value!
export default authContext;

