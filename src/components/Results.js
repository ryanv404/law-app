import { Typography, List } from '@mui/material';
import SingleListItem from './ListItem';

const Results = ({ resultsList, numResults }) => {
  const listItems = resultsList.map((item) => (
    <SingleListItem key={item.id} data={item} />
  ));

  return (
    <>
      <Typography component="h3"  align='center' variant="h5">Search results:</Typography>
      <Typography component="p" align='center' mb={5}>{`Found ${numResults} ${numResults === 1 ? "result" : "results"}.`}</Typography>
      <List>{listItems ? listItems : <Typography component="p" align='center' mb={2}>"No results found."</Typography>}</List>
    </>
  )
};

export default Results;