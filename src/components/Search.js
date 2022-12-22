import { useState } from 'react';
import { useQuery } from 'react-query';
import { 
  TextField, 
  Typography, 
  Box, 
  InputAdornment, 
  IconButton, 
  Menu, 
  MenuItem 
} from '@mui/material';
import GavelSharpIcon from '@mui/icons-material/GavelSharp';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import axios from 'axios';
import Results from './Results';
import { LoadingButton } from '@mui/lab';

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
  const [anchorEl, setAnchorEl] = useState(null);

  const [orderByDate, setOrderByDate] = useState(false);
  const [orderDirection, setOrderDirection] = useState("asc");
  // CAP -> "&ordering=-decision_date"
  // CL -> "&order_by=dateFiled%20desc"
  
  const open = Boolean(anchorEl);
  
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Box 
        component="form" 
        onSubmit={(e) => e.preventDefault()}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: "40px",
          mb: 4
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge='end' onClick={handleClick} onClose={handleClose}>
                  <SortRoundedIcon
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{color: '#ffcd38'}}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={(e) => setOrderDirection("desc")} 
                    onClose={handleClose}
                  >
                      Most recent cases first
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => setOrderDirection("asc")} 
                    onClose={handleClose}
                  >
                    Most recent cases last
                  </MenuItem>
                </Menu>
              </InputAdornment>
            )
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
          <LoadingButton 
            variant='outlined' 
            color='primary' 
            type="submit" 
            onClick={fetchCAP} 
            sx={{
              mr: 2,
              py: 1,
              color: '#fff',
              borderColor: '#ffcd38',
              '&:hover': {
                borderColor: "#ffcd38",
              }
            }}
            startIcon={<SearchRoundedIcon sx={{color: '#ffcd38'}} />}
            loading={isLoadingCAP}
          >
            Caselaw Access Project
          </LoadingButton>
          <LoadingButton 
            variant='outlined' 
            type="submit" 
            onClick={fetchCL}
            sx={{
              py: 1,
              color: '#fff',
              borderColor: '#ffcd38',
              '&:hover': {
                borderColor: "#ffcd38",
              }
            }}
            startIcon={<SearchRoundedIcon sx={{color: '#ffcd38'}} />}
            loading={isLoadingCL}
          >
            CourtListener
          </LoadingButton>
        </Box>
      </Box>
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