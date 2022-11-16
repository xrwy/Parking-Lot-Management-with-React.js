import React, { createContext, useState } from 'react';

export const BodyContext = createContext();

const BodyProvider = ({ children }) => {
    const [show, setShow] = useState(true);
    const [id, setId] = useState(0);

  return (
    <BodyContext.Provider value={{show,setShow,id,setId}}>
        { children }
    </BodyContext.Provider>
  )
}

export default BodyProvider;
