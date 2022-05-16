 // debounce - wait for ms secs and then set the data of search phrase
 export const debounce = (fn: any, delay: number) => {
    let timer: any;
    return function (...args : any) {
      clearTimeout(timer)
      timer = setTimeout(()=>fn(...args), delay)
    }};


export const throttle = (fn: any, delay: number) => {
    let inThrottle: any;
    return function () {
      const args = arguments;
      if (!inThrottle) {
        fn(...args)
       inThrottle = true;
        setTimeout(() => (inThrottle = false), delay);
      }
    };
  };