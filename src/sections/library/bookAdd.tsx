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
  /*bookid,
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
  imageSmal,
  imageURL,*/
  onSuccess,
  onError
}: {
  /*bookid: number;
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
  imageSmal: String;
  imageURL: String;*/
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  console.log("ruh rou");
  return (
    <>
      <Formik
        initialValues={{
          bookid: '',
          isbn13: '',
          title: '',
          author: '',
          publicationYear: '',
          totalRatings: 0,
          avgRating: '',
          oneStar: 0,
          twoStar: 0,
          threeStar: 0,
          fourStar: 0,
          fiveStar: 0,
          imageSmallURL: '',
          imageURL: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          bookid: Yup.number().required('Book id is required'),
          isbn13: Yup.number().required('Isbn13 is required'),
          title: Yup.string().max(255).required('Title is required'),
          author: Yup.string().max(255).required('Author is required'),
          totalRatings: Yup.number().required('This field can not be left Empty'),
          avgRating: Yup.number().required('Average Rating is reqiured'),
          publicationYear: Yup.number().required('PublicationYear is required').min(1000, 'Must be 4 digits').max(9999, 'Must be 4 digits'),
          oneStar: Yup.number().required('This field can not be left Empty'),
          twoStar: Yup.number().required('This field can not be left Empty'),
          threeStar: Yup.number().required('This field can not be left Empty'),
          fourStar: Yup.number().required('This field can not be left Empty'),
          fiveStar: Yup.number().required('This field can not be left Empty'),
          imageSmallURL: Yup.string().max(255).required('image small URL is required').matches(/^https?:\/\//, 'Must start with http:// or https://'),
          imageURL: Yup.string().max(255).required('image large URL is required').matches(/^https?:\/\//, 'Must start with http:// or https://'),
        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          console.dir(values);
          console.log("submitted");
          axios
            .post('closed/addbook', { bookId: values.bookid, isbn: values.isbn13, avgRating: values.avgRating, title: values.title, author: values.author, year: values.publicationYear,
            ratingCnt: values.totalRatings, oneStar: values.oneStar, twoStar: values.twoStar, threeStar: values.threeStar, fourStar: values.fourStar,
            fiveStar: values.fiveStar, smallImageURL: values.imageSmallURL, imageURL: values.imageURL})
            .then((response) => {
              setSubmitting(false);
              resetForm({
                values: {
                    bookid: '',
                    isbn13: '',
                    title: '',
                    author: '',
                    avgRating: '',
                    publicationYear: '',
                    totalRatings: 0,
                    oneStar: 0,
                    twoStar: 0,
                    threeStar: 0,
                    fourStar: 0,
                    fiveStar: 0,
                    imageSmallURL: '',
                    imageURL: '',
                    submit: null
                }
              });
              onSuccess();
            })
            .catch((error) => {
              console.log("ruh rough");
              console.error(error);
              setErrors({submit : error.message });
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
                    id="bookid"
                    type="text"
                    value={values.bookid}
                    name="bookid"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's id"
                    fullWidth
                    error={Boolean(touched.bookid && errors.bookid)}
                  />
                </Stack>
                {touched.bookid && errors.bookid && (
                  <FormHelperText error id="standard-weight-helper-text-name-message-send">
                    {errors.bookid}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="isbn13">Book isbn13</InputLabel>
                  <OutlinedInput
                    id="isbn13"
                    type="text"
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
                  <InputLabel htmlFor="average rating">Books average rating</InputLabel>
                  <OutlinedInput
                    id="avgRating"
                    type="text"
                    value={values.avgRating}
                    name="avgRating"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's average-rating"
                    fullWidth
                    error={Boolean(touched.avgRating && errors.avgRating)}
                  />
                </Stack>
                {touched.avgRating && errors.avgRating && (
                  <FormHelperText error id="standard-weight-helper-text-name-message-send">
                    {errors.avgRating}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                    id="title"
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
                  <InputLabel htmlFor="author">Author</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.author && errors.author)}
                    id="author"
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
                  <InputLabel htmlFor="publicationYear">PublicationYear</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.publicationYear && errors.publicationYear)}
                    id="publicationYear"
                    type="text"
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
                  <InputLabel htmlFor="totalRatings">Total Rating Count</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.totalRatings && errors.totalRatings)}
                    id="totalRatings"
                    type="text"
                    value={values.totalRatings}
                    name="totalRatings"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's total Rating count"
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
                  <InputLabel htmlFor="oneStar">One Stars</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.oneStar && errors.oneStar)}
                    id="oneStar"
                    type="text"
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
                  <InputLabel htmlFor="twoStar">Two Stars</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.twoStar && errors.twoStar)}
                    id="twoStar"
                    type="text"
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
                  <InputLabel htmlFor="threeStar">Three Stars</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.threeStar && errors.threeStar)}
                    id="threeStar"
                    type="text"
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
                  <InputLabel htmlFor="fourStar">Four Stars</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fourStar && errors.fourStar)}
                    id="fourStar"
                    type="text"
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
                  <InputLabel htmlFor="fiveStar">Five Stars</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fiveStar && errors.fiveStar)}
                    id="fiveStar"
                    type="text"
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
                  <InputLabel htmlFor="imageSmallURL">Small image URL
            </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.imageSmallURL
                  && errors.imageSmallURL
                  )}
                    id="imageSmallURL"
                    type="text"
                    value={values.imageSmallURL}
                    name="imageSmallURL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's Small image URL"
                  />
                </Stack>
                {touched.imageSmallURL
     && errors.imageSmallURL
     && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.imageSmallURL
        }
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="imageURL">Large image URL</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.imageURL && errors.imageURL)}
                    id="imageURL"
                    type="text"
                    value={values.imageURL}
                    name="imageURL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's Large image URL"
                  />
                </Stack>
                {touched.imageURL && errors.imageURL && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.imageURL}
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
                    ADD BOOK!
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
