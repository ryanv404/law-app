import { Typography, List } from '@mui/material';
import SingleListItem from './ListItem';

const Results = ({ resultsList, numResults }) => {
  const listItems = resultsList.map((item, idx) => (
    <SingleListItem 
      key={item.id} 
      data={item}
      idx={idx}
    />
  ));

  return (
    <>
      <Typography 
        component="h3" 
        variant="h6"
      >
        Search results
      </Typography>
      <Typography 
        component="p"
        variant="subtitle1"
        mb={2}
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
    </>
  )
};

export default Results;