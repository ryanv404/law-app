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
        marginBottom: "40px",
        fontSize: "14px"
      }}
    >
      Header
    </Typography>
  )
};

export default Header;