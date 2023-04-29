import { Formik } from 'formik';
import {
  Field,
  Form,
  Button,
  Label,
  FormTitle,
  ScrollComponent,
  FilesGroup,
  Notification,
  TitleForm,
} from 'components/Form/Form.styled';
import { Thumb } from 'components/Form/Thumb';
import uniqid from 'uniqid';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from 'components/api';
import { useState } from 'react';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function sentModal() {
  console.log('sent');
  return (
    <Notification>
      <>
        <h3>Thank you for your idea!</h3>
        <p>
          We will add the idea
          <br /> to this app after moderation
        </p>
      </>
    </Notification>
  );
}

async function addData(values) {
  await addDoc(collection(db, 'ideas'), {
    title: values.title,
    difficulty: values.difficulty,
    description: values.description,
    images: values.file.name || '',
    id: uniqid(),
  });
}

function validateRequired(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}

export const IdeaForm = ({ submit }) => {
  const [open, setOpen] = useState(true);
  const closeModal = () => setOpen(false);

  if (!open) {
    return sentModal();
  }

  async function saveFile(file) {
    console.log('sent', file);
    let formData = new FormData();
    formData.set('file', file);

    formData.append('file', file);
    await fetch('components/upload', {
      method: 'POST',
      body: formData,
    });
  }

  return (
    <ScrollComponent>
      <Formik
        initialValues={{
          title: '',
          difficulty: 'easy',
          description: '',
          file: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          addData(values);
          setSubmitting(false);
          closeModal();
          saveFile(values.file);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <TitleForm>Create your idea</TitleForm>
            <Label htmlFor="inp">
              <FormTitle>Title</FormTitle>
              <Field type="text" name="title" validate={validateRequired} />
            </Label>
            <Label htmlFor="description">
              <FormTitle>Write down your idea...</FormTitle>
              <Field
                as="textarea"
                rows="10"
                maxlength="10000"
                name="description"
                validate={validateRequired}
                onChange={event => {
                  setFieldValue('description', event.currentTarget.value);
                }}
              />
            </Label>
            <Label htmlFor="inp">
              <FormTitle>Difficulty</FormTitle>
              <Field
                as="select"
                name="difficulty"
                onChange={event => {
                  setFieldValue('difficulty', event.currentTarget.value);
                }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Field>
            </Label>
            <Label htmlFor="images">Images</Label>
            <FilesGroup>
              <input
                id="images"
                name="images"
                type="file"
                multiple="multiple"
                onChange={event => {
                  setFieldValue('file', event.currentTarget.files[0]);
                }}
                accept="image/png, image/jpeg"
              />
              <Thumb file={values.file} />
            </FilesGroup>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </ScrollComponent>
  );
};
