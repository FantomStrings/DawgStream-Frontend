'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, List } from '@mui/material';

// project import
import axios from 'utils/axios';
import PrioritySelector from 'components/PrioritySelector';
import { BookListItem, NoBooks } from 'components/MessageListItem';
import { IBook } from 'types/book';

const defaultTheme = createTheme();

export default function MessagesList() {
  const [Books, setBooks] = React.useState<IBook[]>([]);
  //const [priority, setPriority] = React.useState(0);

  React.useEffect(() => {
    axios
      //.get('c/message/offset?limit=50&offset=0')
      .get('closed/books/all')
      .then((response) => {
        setBooks(response.data );
        //console.dir(response.data);
        console.dir(response)
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (isbn13: number) => {
    axios
      .delete('/closed/books/isbn/' + isbn13)
      .then((response) => {
        response.status == 200 && setBooks(Books.filter((Book) => Book.isbn13 !== isbn13));
        // console.dir(response.status);
      })
      .catch((error) => console.error(error));
  };

  //const handlePriorityClick = (event: React.MouseEvent<HTMLElement>, newPriority: number) => setPriority(newPriority ?? 0);

  const booksAsComponents = Books
    .filter((Book) => Book.isbn13 != null)
    .map((Book, index, Books) => (
    <React.Fragment key={'Book list item: ' + index}>
    <Box display="flex" alignItems="center" p={2}>
      {Book.image_small_url && (
        <img
          src={Book.image_small_url}
          alt={Book.title}
          style={{ width: 50, height: 75, marginRight: 16 }}
        />
      )}
      <Box flexGrow={1}>
        <Typography variant="h6">{Book.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {Book.authors}
        </Typography>
      </Box>
      <BookListItem book={Book} onDelete={handleDelete} />
        {index < Books.length - 1 && <Divider variant="middle" component="li" />}
    </Box>
    {index < Books.length - 1 && <Divider variant="middle" component="li" />}
  </React.Fragment>
  ));
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
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
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Read Messages
          </Typography>

          <Box sx={{ mt: 1 }}>
            <List>{booksAsComponents.length ? booksAsComponents : <NoBooks/>}</List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}