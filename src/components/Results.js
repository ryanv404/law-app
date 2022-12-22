import { Typography, List, Box } from '@mui/material';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import SingleListItem from './ListItem';

const Results = ({ resultsList, numResults, page, setPage }) => {
  const listItems = resultsList.map((item, idx) => (
    <SingleListItem 
      key={item.id} 
      data={item}
      idx={idx}
    />
  ));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography 
        component="h3" 
        variant="h6"
      >
        Search results
      </Typography>
      <Typography 
        component="p"
        variant="subtitle1"
        mb={4}
      >
        {`Found ${numResults} ${numResults === 1 ? "result" : "results"}.`}
      </Typography>
      <List 
        sx={{
          margin: 0,
          padding: 0
        }}
      >
        {listItems 
          ? listItems 
          : (<Typography component="p" align='center'>
              "No results found."
            </Typography>)
        }
      </List>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
          width: '75%'
        }}
      >
        <ArrowCircleLeftRoundedIcon 
          fontSize='large' 
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          sx={{
            color: '#ffcd38', 
            cursor: 'pointer',
            fontSize: '50px'
          }}
          />
        {`Page ${page}`}
        <ArrowCircleRightRoundedIcon 
          onClick={() => setPage(old => old + 1)}
          sx={{
            color: '#ffcd38', 
            cursor: 'pointer',
            fontSize: '50px'
          }}
        />
      </Box>
    </Box>
  )
};

export default Results;