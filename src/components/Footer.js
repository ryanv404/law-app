import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography 
      color="text.secondary" 
      align="center" 
      sx={{
        flex: "none",
        height: "40px",
        lineHeight: "40px",
        fontSize: "14px",
        borderTop: "1px solid white",
        overflow: "hidden",
        marginTop: "40px",
        maxWidth: "720px",
        minWidth: "100%"
      }}
    >
      {`Copyright © Ryan ${new Date().getFullYear()}.`}
    </Typography>
  )
};

export default Footer;