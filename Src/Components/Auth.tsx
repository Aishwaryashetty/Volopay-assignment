import React, {useEffect, useState} from 'react';

import {Splash, Home} from './index';

// Screen to display splash screen for 7secs and move on to home page
const Auth = () => {
  const [component, setComponent] = useState(<Splash />);

  const timeOut = setTimeout(() => {
    setComponent(<Home />);
  }, 7000);

  useEffect(() => {
    return () => clearTimeout(timeOut);
  }, [timeOut]);

  return component;
};

export default Auth;
