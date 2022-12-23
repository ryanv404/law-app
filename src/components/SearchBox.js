import { useState } from 'react';
import { 
  TextField, 
  Box, 
  InputAdornment, 
  IconButton, 
  Menu, 
  MenuItem 
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { LoadingButton } from '@mui/lab';


const SearchBox = (
  { 
    searchText, 
    setSearchText,
    isLoadingCAP,
    isLoadingCL,
    fetchCAP,
    fetchCL 
  }
) => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);
  
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box 
      component="form" 
      onSubmit={(e) => e.preventDefault()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: "40px",
        mb: 4,
        alignItems: "center"
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
          my: 3,
          minWidth: "470px"
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                edge='end' 
                onClick={handleClick} 
                onClose={handleClose}
              >
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
                  // onClick={() => console.log("desc")} 
                  onClose={handleClose}
                >
                    Most recent cases first
                </MenuItem>
                <MenuItem
                  // onClick={console.log("asc")} 
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
  )
;}

export default SearchBox;