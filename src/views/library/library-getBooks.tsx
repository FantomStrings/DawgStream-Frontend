'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, List, TextField, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import axios from 'utils/axios';
import { BookListItem, NoBooks } from 'components/MessageListItem';
import { IBook } from 'types/book';

const defaultTheme = createTheme();

export default function MessagesList() {
  const [Books, setBooks] = React.useState<IBook[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchFilter, setSearchFilter] = React.useState<'author' | 'year'>('author');
  const [page, setPage] = React.useState(1);
  const [hasMoreBooks, setHasMoreBooks] = React.useState(true);

  // Reset books and pagination when search criteria change
  React.useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMoreBooks(true);
  }, [searchQuery, searchFilter]);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (!searchQuery) {
          // If no search query, fetch paginated results
          const response = await axios.get(`closed/books/all?page=${page}&limit=10`);
          const newBooks = response.data;

          if (newBooks.length > 0) {
            // Append new batch of books
            setBooks((prevBooks) => [...prevBooks, ...newBooks]);
          } else {
            // No more books to load
            setHasMoreBooks(false);
          }
        } else {
          // If there is a search query, fetch once based on the filter
          const endpoint =
            searchFilter === 'author'
              ? `closed/books/author/${searchQuery}`
              : `closed/books/year/${searchQuery}`;

          const response = await axios.get(endpoint);
          setBooks(response.data);
          // No pagination in search mode, so mark hasMoreBooks as false
          setHasMoreBooks(false);
        }
      } catch (error) {
        console.error(error);
        setBooks([]);
      }
    };
    fetchBooks();
  }, [searchQuery, searchFilter, page]);

  const handleDelete = (isbn13: number) => {
    axios
      .delete(`/closed/books/isbn/${isbn13}`)
      .then((response) => {
        if (response.status === 200) {
          setBooks((prevBooks) => prevBooks.filter((Book) => Book.isbn13 !== isbn13));
        }
      })
      .catch((error) => console.error(error));
  };

  const booksAsComponents = Books.map((Book, index) => (
    <React.Fragment key={`Book list item: ${index}`}>
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
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
            mt: 2,
            mb: 2,
            width: '100%',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: 400, flex: 1 }}>
            <TextField
              variant="outlined"
              placeholder="Search books..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flex: 1,
                maxWidth: 400,
              }}
            />
          </Box>
          <ToggleButtonGroup
            value={searchFilter}
            exclusive
            onChange={(_, value) => value && setSearchFilter(value)}
            aria-label="search filter"
          >
            <ToggleButton value="author" aria-label="author">
              Author
            </ToggleButton>
            <ToggleButton value="year" aria-label="year">
              Year
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <MenuBookOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            View books in the library system
          </Typography>
          <Box sx={{ mt: 1 }}>
            <List>{booksAsComponents.length ? booksAsComponents : <NoBooks />}</List>
            {!searchQuery && hasMoreBooks && (
              <Box textAlign="center" mt={2}>
                <Button variant="contained" onClick={() => setPage((prev) => prev + 1)}>
                  Load More
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
