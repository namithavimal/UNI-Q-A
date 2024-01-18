import axios from "axios";
import { createContext, useEffect, useState , useContext} from "react";


const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const value = {
    searchTerm,
    setSearchTerm,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};