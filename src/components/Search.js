import { useState } from 'react';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';
import GavelSharpIcon from '@mui/icons-material/GavelSharp';
import axios from 'axios';

import Results from './Results';
import SearchBox from './SearchBox';

const URL_CAP = "https://api.case.law/v1/cases/?search=";
const URL_CL = "https://www.courtlistener.com/api/rest/v3/search/?q=";

const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

const Search = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [numResults, setNumResults] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // const [orderByDate, setOrderByDate] = useState(false);
  // const [orderDirection, setOrderDirection] = useState("asc");
  // CAP -> "&ordering=-decision_date"
  // CL -> "&order_by=dateFiled%20desc"
  


  const { 
    isLoading: isLoadingCAP, 
    isError: isErrorCAP,
    refetch: fetchCAP 
  } = useQuery(
    ["CAP_results", searchText],
    async ({ queryKey }) => {
      const searchURL = `${URL_CAP}${queryKey[1]}`;
      return await axios.get(searchURL);
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        setNumResults(res.data.count);
        setSearchResult(res.data.results);
      },
      onError: (err) => {
        setErrorMsg(fortmatResponse(err.response?.data || err));
      },
    }
  );

  const { 
    isLoading: isLoadingCL, 
    isError: isErrorCL, 
    refetch: fetchCL 
  } = useQuery(
    ["search_results", searchText],
    async ({ queryKey }) => {
      const searchURL = `${URL_CL}${queryKey[1]}`;
      return await axios.get(searchURL);;
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        setNumResults(res.data.count);
        setSearchResult(res.data.results);
      },
      onError: (err) => {
        setErrorMsg(fortmatResponse(err.response?.data || err));
      },
    }
  );

  return (
    <main>
      <Typography 
        component="h1" 
        variant="h3" 
        alignItems="center"
        justifyContent="center"
        mt="20px"
        display='flex'
      >
        Law Searcher
        <GavelSharpIcon
          sx={{
            fontSize: "3rem",
            marginLeft: "25px",
            color: '#ffcd38',
          }}
        />
      </Typography>
      <SearchBox 
        searchText={searchText}
        setSearchText={setSearchText}
        fetchCAP={fetchCAP}
        fetchCL={fetchCL}
        isLoadingCAP={isLoadingCAP}
        isLoadingCL={isLoadingCL}
      />
      {(isErrorCAP || isErrorCL) 
        && (!isLoadingCAP && !isLoadingCL) 
        && <pre>{errorMsg}</pre>
      }

      {searchResult 
        && (!isLoadingCAP && !isLoadingCL) 
        && (
          <Results 
            resultsList={searchResult} 
            numResults={numResults} 
            page={page} 
            setPage={setPage}
          />)
      }
    </main>
  )
};

export default Search;