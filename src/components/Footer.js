import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © Ryan '}
      {new Date().getFullYear()}.
    </Typography>
  )
};

export default Footer;