'use client';

import React from 'react';

// next

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

import axios from 'utils/axios';

export default function AddBook({   
  bookid,
  isbn13,
  title,
  author,
  publicationYear,
  totalRatings,
  oneStar,
  twoStar,
  threeStar,
  fourStar,
  fiveStar,
  imageSmallURL,
  imageLargeURL,
  onSuccess,
  onError
}: {
  bookid: number;
  isbn13: number;
  title: String;
  author: String;
  publicationYear: number;
  totalRatings: number;
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  imageSmallURL: String;
  imageLargeURL: String;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  return (
    <>
      <Formik
        initialValues={{
          bookid: null,
          isbn13: null,
          title: '',
          author: '',
          publicationYear: null,
          totalRatings: null,
          oneStar: null,
          twoStar: null,
          threeStar: null,
          fourStar: null,
          fiveStar: null,
          imageSmallURL: null,
          imageLargeURL: null,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          bookid: Yup.number().required('book id is required'),
          isbn13: Yup.number().required('isbn13 is required'),
          title: Yup.string().max(255).required('Title is required'),
          Author: Yup.string().max(255).required('Author is required'),
          publicationYear: Yup.number().required('publicationYear is required'),
          imageSmallURL: Yup.string().max(255).required('image small URL is required'),
          imageLargeURL: Yup.string().max(255).required('image large URL is required'),
        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          console.dir(values);
          console.log("submitted");

          axios
            .post('/addbook', { bookId: values.bookid, isbn: values.isbn13, title: values.title, author: values.author, year: values.publicationYear,
            ratingCnt: values.totalRatings, oneStar: values.oneStar, twoStar: values.twoStar, threeStar: values.threeStar, fourStar: values.fourStar,
            fiveStar: values.fiveStar, smallImageURL: values.imageSmallURL, imageURL: values.imageLargeURL})
            .then((response) => {
              setSubmitting(false);
              resetForm({
                values: {
                    bookid: null,
                    isbn13: null,
                    title: '',
                    author: '',
                    publicationYear: null,
                    totalRatings: null,
                    oneStar: null,
                    twoStar: null,
                    threeStar: null,
                    fourStar: null,
                    fiveStar: null,
                    imageSmallURL: null,
                    imageLargeURL: null,
                    submit: null
                }
              });
              onSuccess();
            })
            .catch((error) => {
              console.error(error);
              setErrors({ title: error.message });
              setSubmitting(false);
              onError(error.message);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="id">Book id</InputLabel>
                  <OutlinedInput
                    id="sender-name"
                    type="number"
                    value={values.bookid}
                    name="bookid"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's id"
                    fullWidth
                    error={Boolean(touched.bookid && errors.bookid)}
                  />
                </Stack>
                {touched.isbn13 && errors.isbn13 && (
                  <FormHelperText error id="standard-weight-helper-text-name-message-send">
                    {errors.isbn13}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="isbn13">Book isbn13</InputLabel>
                  <OutlinedInput
                    id="sender-name"
                    type="number"
                    value={values.isbn13}
                    name="isbn13"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's isbn13"
                    fullWidth
                    error={Boolean(touched.isbn13 && errors.isbn13)}
                  />
                </Stack>
                {touched.isbn13 && errors.isbn13 && (
                  <FormHelperText error id="standard-weight-helper-text-name-message-send">
                    {errors.isbn13}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="title">title</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                    id="-password-login"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's title"
                  />
                </Stack>
                {touched.title && errors.title && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="author">author</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.author && errors.author)}
                    id="-password-login"
                    type="text"
                    value={values.author}
                    name="author"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's author"
                  />
                </Stack>
                {touched.author && errors.author && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.author}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="publicationYear">publicationYear</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.publicationYear && errors.publicationYear)}
                    id="-password-login"
                    type="number"
                    value={values.publicationYear}
                    name="publicationYear"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's publicationYear"
                  />
                </Stack>
                {touched.publicationYear && errors.publicationYear && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.publicationYear}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="totalRatings">totalRatings</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.totalRatings && errors.totalRatings)}
                    id="-password-login"
                    type="number"
                    value={values.totalRatings}
                    name="totalRatings"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's totalRatings"
                  />
                </Stack>
                {touched.totalRatings && errors.totalRatings && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.totalRatings}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="oneStar">oneStar</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.oneStar && errors.oneStar)}
                    id="-password-login"
                    type="number"
                    value={values.oneStar}
                    name="oneStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's oneStar"
                  />
                </Stack>
                {touched.oneStar && errors.oneStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.oneStar}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="twoStar">twoStar</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.twoStar && errors.twoStar)}
                    id="-password-login"
                    type="number"
                    value={values.twoStar}
                    name="twoStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's twoStar"
                  />
                </Stack>
                {touched.twoStar && errors.twoStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.twoStar}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="threeStar">threeStar</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.threeStar && errors.threeStar)}
                    id="-password-login"
                    type="number"
                    value={values.threeStar}
                    name="threeStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's threeStar"
                  />
                </Stack>
                {touched.threeStar && errors.threeStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.threeStar}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="fourStar">fourStar</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fourStar && errors.fourStar)}
                    id="-password-login"
                    type="number"
                    value={values.fourStar}
                    name="fourStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's fourStar"
                  />
                </Stack>
                {touched.fourStar && errors.fourStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.fourStar}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="fiveStar">fiveStar</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fiveStar && errors.fiveStar)}
                    id="-password-login"
                    type="number"
                    value={values.fiveStar}
                    name="fiveStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's fiveStar"
                  />
                </Stack>
                {touched.fiveStar && errors.fiveStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.fiveStar}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="imageSmallURL">imageSmallURL</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.imageSmallURL && errors.imageSmallURL)}
                    id="-password-login"
                    type="text"
                    value={values.imageSmallURL}
                    name="imageSmallURL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's imageSmallURL"
                  />
                </Stack>
                {touched.imageSmallURL && errors.imageSmallURL && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.imageSmallURL}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="imageLargeURL">imageLargeURL</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.imageLargeURL && errors.imageLargeURL)}
                    id="-password-login"
                    type="text"
                    value={values.imageLargeURL}
                    name="imageLargeURL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's imageLargeURL"
                  />
                </Stack>
                {touched.imageLargeURL && errors.imageLargeURL && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.imageLargeURL}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    SEND!
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
