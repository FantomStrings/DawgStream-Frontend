import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function FiveStarsRating({bookId, onAddRating, onDeleteRating} : {bookId : number, onAddRating : (bookId: number, rating: number) => void, onDeleteRating: (bookId: number, rating: number) => void}) {
  const [value, setValue] = React.useState<number | null>(null);
  const [previousValue, setPreviousValue] = React.useState<number | null>(null);

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    if(newValue === null && value !== null){
      onDeleteRating(bookId, value); // If user clears the rating, call handleDeleteRating
    } else if(newValue !== null) {
      onAddRating(bookId, newValue); // If a new rating is selected, call handleAddRating
    }
    setPreviousValue(value); // Update previous rating
    setValue(newValue); // Update current rating
  };

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography component="legend">Rate this book</Typography>
      <Rating
        name={`rating-${bookId}`}
        value={value}
        onChange={handleRatingChange}
      />
    </Box>
  );
}