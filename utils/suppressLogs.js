if (process.env.NODE_ENV === 'production') {
    console.log = () => {}; // Disable console.log in production
    console.error = () => {}; // Disable console.error in production  
  }
    