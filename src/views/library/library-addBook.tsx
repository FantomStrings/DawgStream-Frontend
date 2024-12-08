'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';

// Project imports
import PrioritySelector from 'components/PrioritySelector';
import SendMessage from 'sections/messages/message-forms/messageSend';
import AddBook from 'sections/library/bookAdd';
import { number } from 'yup';

const defaultTheme = createTheme();

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};

export default function MessageSend() {
  //<PrioritySelector initialValue={priority} onClick={handlePriorityClick} /> 93
  //const [priority, setPriority] = React.useState(1);
  const [bookid, setBookid] = React.useState(0);
  const [isbn13, setIsbn13] = React.useState(0);
  const [title, setTitle] = React.useState(String);
  const [author, setAuthor] = React.useState(String);
  const [publicationYear, setPublicationYear] = React.useState(0);
  const [totalRatings, setTotalRatings] = React.useState(0);
  const [oneStar, setOneStar] = React.useState(0);
  const [twoStar, setTwoStar] = React.useState(0);
  const [threeStar, setThreeStar] = React.useState(0);
  const [fourStar, setFourStar] = React.useState(0);
  const [fiveStar, setFiveStar] = React.useState(0);
  const [imageSmallURL, setImageSmallURL] = React.useState(String);
  const [imageLargeURL, setImageLargeURL] = React.useState(String);
  const [alert, setAlert] = React.useState(EMPTY_ALERT);

  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'The message was sent!',
      alertSeverity: 'success'
    });
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Message NOT sent! Error: ' + message,
      alertSeverity: 'error'
    });
  };

  //const handlePriorityClick = (event: React.MouseEvent<HTMLElement>, newPriority: number) => newPriority && setPriority(newPriority);

  return (
    <ThemeProvider theme={defaultTheme}>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SendIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add book to the library
          </Typography>

          <Box sx={{ mt: 1 }}>
            <AddBook bookid={bookid} isbn13={isbn13} author={author} title={title} publicationYear={publicationYear}
            totalRatings={totalRatings} oneStar={oneStar} twoStar={twoStar} threeStar={threeStar}
            fourStar={fourStar} fiveStar={fiveStar} imageSmallURL={imageSmallURL}
            imageLargeURL={imageLargeURL} onSuccess={onSuccess} onError={onError} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
