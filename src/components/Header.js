import { Typography } from "@mui/material";

const Header = () => {
  return (
    <Typography 
      color="text.secondary" 
      align="center"
      sx={{
        flex: "none",
        height: "40px",
        lineHeight: "40px",
        borderBottom: "1px solid white",
        margin: "0px 0px 40px 0px",
        fontSize: "14px",
        maxWidth: "720px",
        minWidth: "100%"
      }}
    >
      Header
    </Typography>
  )
};

export default Header;