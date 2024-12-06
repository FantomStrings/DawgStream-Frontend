'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, List, TextField, Button, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import axios from 'utils/axios';
import { BookListItem, NoBooks } from 'components/MessageListItem';
import { IBook } from 'types/book';

const defaultTheme = createTheme();

type SearchFilter = 'author' | 'year' | 'isbn' | 'title';

export default function MessagesList() {
  const [Books, setBooks] = React.useState<IBook[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchFilter, setSearchFilter] = React.useState<SearchFilter>('author');
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
          
          let endpoint: string;

          switch(searchFilter) {
            case 'author':
              endpoint = `closed/books/author/${searchQuery}`;
              break;
            case 'year':
              endpoint = `closed/books/year/${searchQuery}`;
              break;
            case 'isbn':
              endpoint = `closed/books/${searchQuery}`;
              break;
            case 'title':
              endpoint = `closed/books/title/${searchQuery}`;
              break;
            default:
              endpoint = `closed/books/author/${searchQuery}`;
          }

          const response = await axios.get(endpoint);
          const data = response.data;

          setBooks(Array.isArray(data) ? data : [data]);
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
            position: 'fixed',
            top: 70,
            right: 25,
            zIndex: 999,
            backgroundColor: (theme) => theme.palette.background.default,
            py: 2,
            display: 'flex',
            gap: 1,
          }}
        >
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
          <FormControl variant='outlined' size='small' sx={{minWidth: 120}}>
            <InputLabel id = 'search-filter-label'> Filter </InputLabel>
            <Select 
              labelId='search-filter-label'
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value as SearchFilter)}
              label = 'Filter'
              >
                <MenuItem value= 'author'> Author </MenuItem>
                <MenuItem value= 'year'> Year </MenuItem>
                <MenuItem value= 'isbn'> ISBN </MenuItem>
                <MenuItem value= 'title'> Title </MenuItem>
              </Select>
          </FormControl>
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
