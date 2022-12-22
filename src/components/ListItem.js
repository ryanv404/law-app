import { 
  ListItem, 
  ListItemText, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button, 
  Link,
  Box, 
  Typography} from "@mui/material";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import { useState } from "react";

const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

const formatCase = (caseInfo) => {
  const searchEngine = caseInfo.hasOwnProperty("name_abbreviation") ? "CAP" : "CL";
  
  let caseTitle, caseYear, caseURL, caseCourt, caseCite;
  if (searchEngine === "CL") {
    caseYear = new Date(caseInfo.dateFiled).getFullYear();
    caseCite = caseInfo.citation !== null ? caseInfo.citation[0] : "___"
    caseTitle = `${caseInfo.caseName}, ${caseCite} (${caseYear}).`;
    caseURL = `https://www.courtlistener.com${caseInfo.absolute_url}`;
    caseCourt = caseInfo.court;
  } else if (searchEngine === "CAP") {
    caseYear = new Date(caseInfo.decision_date).getFullYear();
    caseCite = caseInfo.citations !== null ? caseInfo.citations[0].cite : "___"
    caseTitle = `${caseInfo.name_abbreviation}, ${caseCite} (${caseYear}).`;
    caseURL = caseInfo.frontend_url;
    caseCourt = caseInfo.court.name;
  }

  return [caseTitle, caseURL, caseCourt];
};

const SingleListItem = ({ data, idx }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const bgColor = idx % 2 === 0 ? "#202020" : "#2a2a2a";
  const listItemStyle = {
    padding: "10px",
    margin: "5px 0",
    backgroundColor: bgColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  };
  const [listItemTitle, listItemURL, listItemCourt] = formatCase(data);

  return (
    <>
      <ListItem 
        sx={listItemStyle}
        onClick={handleClickOpen}
      >
        <ListItemText primary={listItemTitle} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
            marginBottom: "10px"
          }}
        >
          <LocationOnSharpIcon fontSize="small" sx={{mr: 1, color: '#f50057'}} />
          <Typography variant="body2">{listItemCourt}</Typography>
        </Box>
        <Link 
          href={listItemURL} 
          underline="hover"
          target="_blank"
          rel="noopener"
          variant="body2"
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "5px",
            marginBottom: "10px"
          }}
        >
          <LibraryBooksRoundedIcon fontSize="small" sx={{mr: 1, color: '#f50057'}} />
          Full text
        </Link>
      </ListItem>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="dialog-description"
      >
        <DialogTitle>{listItemTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-content" mb={4} component="pre">
            {fortmatResponse(data)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SingleListItem;