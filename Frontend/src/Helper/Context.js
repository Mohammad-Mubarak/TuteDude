import React, { createContext, useState } from 'react';
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [searchText, setSearchText] = useState('');

  return (
    <ProductContext.Provider value={{ allBooks, setAllBooks, searchText, setSearchText }}>
      {children}
    </ProductContext.Provider>
  );
};