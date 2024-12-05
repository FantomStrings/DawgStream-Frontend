'use client';

import * as React from 'react';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, List } from '@mui/material';

// project import
import axios from 'utils/axios';
import { BookListItem, NoBooks } from 'components/MessageListItem';
import { IBook } from 'types/book';

const defaultTheme = createTheme();

export default function LibraryList() {
  console.log("LibraryList component rendered");
  const [Books, setBooks] = React.useState<IBook[]>([]);
  const [singleBook, setSingleBook] = React.useState<IBook | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    console.log("LibraryList useEffect called");
    axios
      .get('closed/books/all')
      .then((response) => {
        console.log("Fetched books:", response.data);
        setBooks(response.data);
        console.dir(response);
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

  const handleDisplaySingleBook = (isbn13: number) => {
    axios
      .get('/closed/books/' + isbn13)
      .then((response) => {
        response.status == 200 && setSingleBook(response.data);
        setModalOpen(true);
        console.dir(response);
      })
      .catch((error) => console.error(error));;
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
      <BookListItem book={Book} onDelete={handleDelete} onView={handleDisplaySingleBook} />
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
            <MenuBookOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            View books in the library system
          </Typography>

          <Box sx={{ mt: 1 }}>
            <List>{booksAsComponents.length ? booksAsComponents : <NoBooks/>}</List>
          </Box>
        </Box>
        {/* Modal for Single Book */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            maxWidth: 800, // Set a maximum width for the modal
            width: '90%', // Ensure responsiveness on smaller screens
            flexDirection: { xs: 'column', md: 'row' }, // Column for small screens, row for larger
            gap: 4, // Space between content and image
          }}
        >
          {/* Book Information */}
          <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h6" sx={{ mb: 2 }}>
             <strong>{singleBook?.title || "Loading..."}</strong>
            </Typography>
            {singleBook && (
             <>
            <Typography variant="body2" sx={{ mb: 1 }}>
             <strong>Author:</strong> {singleBook.authors}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
             <strong>Published:</strong> {singleBook.publication_year}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
             <strong>ISBN-13:</strong> {singleBook.isbn13}
           </Typography>
           <Typography variant="body2" sx={{ mb: 1 }}>
             <strong>Average Rating:</strong> {singleBook.rating_avg}
           </Typography>
            </>
            )}
          </Box>

          {/* Book Image */}
          <Box flex={1} display="flex" justifyContent="center" alignItems="center">
             {singleBook?.image_url ? (
             <img
                src={singleBook.image_url}
                alt={`${singleBook.title} cover`}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 8, // Optional: Add rounded corners for aesthetic
                }}
              />
              ) : (
            <Typography variant="body2">Loading image...</Typography>
            )}
          </Box>
        </Box>
      </Modal>
      </Container>
    </ThemeProvider>
  );
}