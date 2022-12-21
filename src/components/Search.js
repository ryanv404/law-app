import { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, TextField, Typography, Box } from '@mui/material';
import GavelSharpIcon from '@mui/icons-material/GavelSharp';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import axios from 'axios';
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
    <main>
      <Typography 
        component="h1" 
        variant="h3" 
        align="center"
      >
        Law Searcher
        <GavelSharpIcon
          sx={{
            fontSize: "45px",
            marginLeft: "15px",
          }}
        />
      </Typography>
      <Box 
        component="form" 
        onSubmit={(e) => e.preventDefault()}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 5
        }}
      >
        <TextField 
          variant="outlined" 
          type="text" 
          name="case_search" 
          id="case_search"
          onChange={(e) => setSearchText(e.target.value)} 
          value={searchText} 
          autoComplete="off" 
          label="Search for a case"
          sx={{
            my: 3
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button 
            variant='outlined' 
            color='secondary' 
            type="submit" 
            onClick={fetchCAP} 
            sx={{
              mr: 2,
              py: 1
            }}
          >
            <SearchRoundedIcon /> Search CAP
          </Button>
          <Button 
            variant='outlined' 
            type="submit" 
            onClick={fetchCL}
            sx={{
              py: 1
            }}
          >
            <SearchRoundedIcon /> Search CourtListener
          </Button>
        </Box>
      </Box>
      {(isLoadingCAP || isLoadingCL) 
        && <Typography component="h3" variant="h6">Loading...</Typography>
      }
      {(isErrorCAP || isErrorCL) 
        && (!isLoadingCAP && !isLoadingCL) 
        && <pre>{errorMsg}</pre>
      }
      {searchResult 
        && (!isLoadingCAP && !isLoadingCL) 
        && <Results resultsList={searchResult} numResults={numResults} />
      }
    </main>
  )
}

export default Search