'use client';

import * as React from 'react';
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
import BookModal from 'components/ModalSingleBook';

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

  const handleAddRating = (id: number, rating: number) => {
    if (rating < 1 || rating > 5) {
      console.error('Invalid rating. Please provide a rating between 1 and 5.');
      return;
    }
  
    axios
      .put('/closed/books/rating', { id, rating })
      .then((response) => {
        if (response.status === 200) {
          console.log('Rating added successfully:', response.data);
  
          // Update the book list with the new rating data
          const updatedBooks = Books.map((book) =>
            book.id === id ? { ...book, ...response.data[0] } : book
          );
          setBooks(updatedBooks);
  
          console.log('Updated book list:', updatedBooks);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteRating = (bookId: number, rating: number) => {
    axios
      .delete('/closed/books/rating', {
        data: {
          id: bookId,
          rating: rating,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Rating deleted successfully:", response.data);
  
          // update the book list with the new rating data
          const updatedBooks = Books.map((book) =>
            book.id === bookId ? { ...book, ...response.data[0] } : book
          );
          setBooks(updatedBooks);
        }
      })
      .catch((error) => {
        console.error("Failed to delete rating:", error);
      });
  };

  const handleDisplaySingleBook = (isbn13: number) => {
    axios
      .get('/closed/books/' + isbn13)
      .then((response) => {
        response.status == 200 && setSingleBook(response.data);
        setModalOpen(true);
        console.dir(response);
        // console.dir(response.status);
      })
      .catch((error) => console.error(error));
  };

  //const [priority, setPriority] = React.useState(1);
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
        <BookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        book={singleBook}
        onSubmitRating={handleAddRating}
        onUndoRating={handleDeleteRating}
      />
      </Container>
    </ThemeProvider>
  );
}