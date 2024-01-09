// import React from 'react'
// import {
//     Container,
//     Grid,
//     IconButton,
//     Tooltip,
//     Typography,
//   } from "@mui/material";
// import styles from './Footer.module.css'
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import { Link, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import {Container,Typography,Grid,Box, ThemeProvider} from "@mui/material";
import { LinkedIn, Instagram, Twitter, YouTube } from "@mui/icons-material";
import theme from "./Theme";

const Footer = () => {

    const linkedIn = "https://www.linkedin.com/in/shubham-sharma-76861a1a0";
  const gitHub = "https://github.com/ShubhamSharma20061998";

  return (
    <ThemeProvider theme={theme} >
    <Box
    component="footer"
    sx={{
        backgroundColor: 'aqua',
        color:'customBlue',
        
    }}
    >
    <Container   >
        <Grid container>
        <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
            About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
hai            </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
            Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Email: mail@comcraft.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Phone: +91 945684235
            </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
            Follow Us
            </Typography>
            <Link to="https://www.linkedin.com/" target="_blank" color="inherit">
            <LinkedIn />
            </Link>
            <Link
            to="https://www.instagram.com/"
            color="inherit"
            target="_blank"
            sx={{ pl: 1, pr: 1 }}
            >
            <Instagram />
            </Link>
            <Link to="https://www.youtube.com/" target="_blank" color="inherit">
            <YouTube />
            </Link>
        </Grid>
        </Grid>
        <Box mt={5}>
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
            CommunityCrafter
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
        </Box>
    </Container>
    </Box>
    </ThemeProvider>



    // <footer className={styles.footer}>
    //   <Container sx={{ padding: "1.5rem" }}>
    //     <Grid container justifyContent={"center"}>
    //       <Grid item md={4} xs={12}>
    //         {/* <img
    //           src={logo}
    //           alt="logo"
    //           className={`${styles.footerLogo} cursorPointer`}
    //           onClick={() => navigate("/landingPage")}
    //         /> */}
    //       </Grid>
    //       <Grid item md={4} xs={12}>
    //         <Typography variant="h6">Quick links</Typography>
    //         {/* <ul>
    //           {quickLinks?.map(({ title, path }, index) => (
    //             <li
    //               key={index}
    //               className="cursorPointer widthFitContent"
    //               onClick={() => {
    //                 handleClick(title, path);
    //               }}
    //             >
    //               {title}
    //             </li>
    //           ))}
    //         </ul> */}
    //       </Grid>
    //       <Grid item md={4} xs={12}>
    //         <Typography variant="h6">Get in touch</Typography>
    //         <div>
    //           <Tooltip title="LinkedIn">
    //             <IconButton aria-label="LinkedIn">
    //               <Link target="_blank" to={linkedIn}>
    //                 <LinkedInIcon className={styles.connectIcon} />
    //               </Link>
    //             </IconButton>
    //           </Tooltip>
    //           <Tooltip title="Github">
    //             <IconButton aria-label="Github">
    //               <Link target="_blank" to={gitHub}>
    //                 <GitHubIcon className={styles.connectIcon} />
    //               </Link>
    //             </IconButton>
    //           </Tooltip>
    //         </div>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </footer>
  )
}

export default Footer
