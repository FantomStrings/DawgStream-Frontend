import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IBook } from 'types/book';
import FiveStarsRating from './StarRatingSelect';

export default function BookModalPopup({book, open, onClose, onSubmitRating, onUndoRating}
     : {book : IBook | null, open: boolean, onSubmitRating: (id: number, rating: number) => void, onUndoRating : (id: number, rating: number) => void, onClose : () => void;} ){

    return(
        <Modal open={open} onClose={onClose}>
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
            width: '90%',
            flexDirection: { xs: 'column', md: 'row' }, // Column for small screens, row for larger
            gap: 4, // Space between content and image
        }}
      >
        {/* Book Information */}
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h6" sx={{ mb: 2 }}>
          <strong>{book?.title || "Loading..."}</strong>
          </Typography>
          {book && (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Author:</strong> {book.authors}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Published:</strong> {book.publication_year}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ISBN-13:</strong> {book.isbn13}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Average Rating:</strong> {book.rating_avg}
              </Typography>
              {/* FiveStarsRating Component */}
              <Box sx={{ mt: 1 }}>
                <FiveStarsRating
                  bookId={book.id}
                  onAddRating={onSubmitRating}
                  onDeleteRating={onUndoRating}
                />
              </Box>
            </>
          )}
        </Box>

        {/* Book Image */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          {book?.image_url ? (
            <img
              src={book.image_url}
              alt={`${book.title} cover`}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 8,
              }}
            />
          ) : (
            <Typography variant="body2">Loading image...</Typography>
          )}
        </Box>
      </Box>
    </Modal>

    );

}