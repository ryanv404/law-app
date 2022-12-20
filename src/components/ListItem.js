import { 
  ListItem, 
  ListItemText, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button } from "@mui/material";
import { useState } from "react";

const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

const SingleListItem = ({ data, idx }) => {
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
    backgroundColor: bgColor
  };
  const listItemTitle = data.hasOwnProperty("name_abbreviation") ? data.name_abbreviation : data.caseName;

  return (
    <ListItem sx={listItemStyle}>
      <ListItemText
        primary={listItemTitle}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="dialog-description"
      >
        <DialogTitle>{listItemTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-content">
            <pre>{fortmatResponse(data)}</pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  )
}

export default SingleListItem;