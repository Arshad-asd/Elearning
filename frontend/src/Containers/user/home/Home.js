// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
// import ComputerIcon from '@mui/icons-material/Computer';
// import WorkIcon from '@mui/icons-material/Work';
// import SchoolIcon from '@mui/icons-material/School';

import exam from "../../../assets/Exam.svg";
import onlineTest from '../../../assets/online-test.svg' 
import certificaton from '../../../assets/certification.svg' 
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Footer from './home/Footer';
import Banner from './Banner';
import './Home.css'



const cards = [1, 2, 3];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Home() {

return (
  <ThemeProvider theme={defaultTheme}>
  <CssBaseline />
  <div className="home-background" > {/* Apply the CSS class here */}
  <main>
    {/* Hero unit */}
    <Banner />

    <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#4D2C5E',
    padding: 5,
    margin: 17,
    border: '1px solid #ccc',
    borderRadius: '5px',
  }}
>
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    }}
  >
    <div
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
      >
        <img
          src={onlineTest}
          alt="Computer"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%'}}
        />
      </div>
      <Typography variant="h6">Learn the latest skill</Typography>
      <Typography variant="body2">Add more skill to your resume</Typography>
    </div>

    <div
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
      >
        <img
          src={exam}
          alt="Career"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%' }}
        />
      </div>
      <Typography variant="h6">Get ready for the career</Typography>
      <Typography variant="body2">Be prepared for having a high package job</Typography>
    </div>

    <div
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
      >
        <img
          src={certificaton}
          alt="Certificate"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%' }}
        />
      </div>
      <Typography variant="h6">Earn a certificate</Typography>
      <Typography variant="body2">Announce your achievement through your certificate</Typography>
    </div>
  </div>
</Box>

    <Container sx={{ py: 8 }} maxWidth="md" >
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: '56.25%',
                }}
                image="https://source.unsplash.com/random?wallpapers"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                UI/UX Design for Beginners
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>
             
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </main>
  </div>

</ThemeProvider>


);
}

export default Home