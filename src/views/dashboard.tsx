// material-ui
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import DawgStreamLogo from '/src/views/DawgStreamLogo.png';
// project imports
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return (
    <MainCard title="Dawg Stream">
      <CardMedia>
      <header style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginBottom: '16px' }}>
          <img src={DawgStreamLogo.src} alt="Dawg Stream Logo" style={{ maxWidth: '10%', height: 'auto' }} />
        </header>
      <Typography variant="body2">
      Where books flow as freely as ideas! 📚🐾Dive into a library like no other.<br></br><br></br> 
      Whether you're hunting for your next great read or eager to share a hidden gem, 
      Dawg Stream is your go-to spot for all things literary. <br></br>
      Start exploring now—because every story deserves to be shared!
      </Typography>
      </CardMedia>
    </MainCard>
  );
}
