import { Typography } from "@mui/material";

const Footer = () => {
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
      {`Copyright © Ryan ${new Date().getFullYear()}.`}
    </Typography>
  )
};

export default Footer;