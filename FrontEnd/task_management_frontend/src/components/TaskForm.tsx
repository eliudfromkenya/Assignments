import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TaskPriority } from '../types/Task';
import { User } from '../types/User';

interface FormValues {
  title: string;
  description: string;
  priority: string; // Replace with your `TaskPriority` type if defined
  assigneeId: number | undefined;
}

interface TaskFormProps {
    onSubmit: (taskData: {
      title: string;
      description: string;
      priority: TaskPriority;
      assigneeId?: number;
    }) => Promise<void>;
    onCancel: () => void;
    users: User[];
  }

const TaskForm: React.FC<TaskFormProps> = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: FormValues = {
    title: '',
    description: '',
    priority: '',
    assigneeId: undefined,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().required('Priority is required'),
    assigneeId: Yup.number().nullable(),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitError(null); // Clear previous errors
      // Simulate API call
      console.log('Submitting form:', values);
      // Throw an error for demonstration
      throw new Error('Server error occurred');
    } catch (error: any) {
      setSubmitError(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="priority">Priority</label>
            <Field id="priority" name="priority" />
            <ErrorMessage name="priority" component="div" />
          </div>
          <div>
            <label htmlFor="assigneeId">Assignee</label>
            <Field id="assigneeId" name="assigneeId" type="number" />
            <ErrorMessage name="assigneeId" component="div" />
          </div>
          {submitError && <div className="error">{submitError}</div>}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
