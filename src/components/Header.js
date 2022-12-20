import { Typography } from "@mui/material";

const Header = () => {
  return (
    <Typography 
      color="text.secondary" 
      align="center"
      sx={{
        flex: "none",
        height: "40px",
        lineHeight: "40px"
      }}
    >
      Header
    </Typography>
  )
};

export default Header;