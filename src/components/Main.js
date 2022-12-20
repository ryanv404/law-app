import { Box } from '@mui/material';
import Search from './Search';

const Main = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: '1'
      }}
    >
      <Search />
    </Box>
  )
};

export default Main;