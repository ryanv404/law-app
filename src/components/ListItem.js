import { ListItem, ListItemText } from "@mui/material";

// const fortmatResponse = (res) => {
//   return JSON.stringify(res, null, 2);
// };

const SingleListItem = ({ data }) => {
  // const citationFilter = (citationsList) => {
  //   const officialCite = citationsList.filter((citation) => citation.type === "official");
  //   return officialCite ? officialCite[0].cite : citationsList[0].cite
  // };

  // const citation = citationFilter(data.citations);

  // const caseFormat = {
  //   "name": data.name,
  //   "reporter": data.reporter.full_name,
  //   "court": data.court.name,
  // };

  // const singleCase = `${data.name_abbreviation}, ${citation} (${data.court.name_abbreviation} ${data.decision_date})`

  return (
    <ListItem sx={{
      flexDirection: "column",
      alignItems: "flex-start"
    }}>
      <ListItemText
        primary={data.hasOwnProperty("name_abbreviation") ? data.name_abbreviation : data.caseName}
      />
      {/* <ListItemText 
        component="pre" 
        sx={{
          whiteSpace: 'pre-wrap', 
          overflowWrap: 'break-word', 
          maxWidth: '100vh'
        }}
        primary={fortmatResponse(data)}
      /> */}
    </ListItem>
  )
}

export default SingleListItem;