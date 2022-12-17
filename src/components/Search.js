import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Results from './Results';

const URL_CAP = "https://api.case.law/v1/cases/?search=";
const URL_CL = "https://www.courtlistener.com/api/rest/v3/search/?q=";

const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [numResults, setNumResults] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const { isLoading: isLoadingCAP, isError: isErrorCAP, refetch: fetchCAP } = useQuery(
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

  const { isLoading: isLoadingCL, isError: isErrorCL, refetch: fetchCL } = useQuery(
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
    <>
      <div>
        <h1>Law App</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="case_search">
            <input type="text" name="case_search" id="case_search"
            onChange={(e) => setSearchText(e.target.value)} value={searchText} 
            autoComplete="off" placeholder="Search for a case..." style={{width: "300px"}}
            />
          </label>
          <button type="submit" onClick={fetchCAP}>
            Search CAP
          </button>
          <button type="submit" onClick={fetchCL}>
            Search CourtListener
          </button>
        </form>
      </div>
      {(isLoadingCAP || isLoadingCL) && <p>Loading...</p>}
      {(isErrorCAP || isErrorCL) && (!isLoadingCAP && !isLoadingCL) && <pre>{errorMsg}</pre>}
      {searchResult && (!isLoadingCAP && !isLoadingCL) && <Results resultsList={searchResult} numResults={numResults} />}
    </>
  )
}

export default Search