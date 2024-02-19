

import { Link } from "react-router-dom";
import {Container,Typography,Grid,Box, ThemeProvider} from "@mui/material";
import { LinkedIn, Instagram, Twitter, YouTube } from "@mui/icons-material";
import theme from "./Theme";
import './Footer.module.css'


const Footer = () => {

    const linkedIn = "https://www.linkedin.com/in/shubham-sharma-76861a1a0";
  const gitHub = "https://github.com/ShubhamSharma20061998";

  return (
    <ThemeProvider theme={theme} >
    <Box
    component="footer"
    sx={{
        color:'white',
        backgroundColor: '#092b5a',
        
    }}
    >
    <Container   >
        <Grid container>
        <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.light" gutterBottom>
            About Us
            </Typography>
            <Typography variant="body2" color="text.light">
            Books-Store is a dynamic online marketplace tailored for book enthusiasts, offering a secure and user-friendly environment for browsing, purchasing, and selling books. 
           </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.light" gutterBottom>
            Contact Us
            </Typography>
            <Typography variant="body2" color="text.light">
            Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001
            </Typography>
            <Typography variant="body2" color="text.light">
            Email: mail@bookstore.com
            </Typography>
            <Typography variant="body2" color="text.light">
            Phone: +91 945684235
            </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.light" gutterBottom>
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
        <Typography variant="body2" color="text.light" align="center">
             {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
            BookStore
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
