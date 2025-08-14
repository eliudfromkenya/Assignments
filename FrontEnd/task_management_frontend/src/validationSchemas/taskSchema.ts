import * as Yup from 'yup';

export const taskSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .max(100, 'Title must be less than 100 characters'),
    description: Yup.string()
        .max(500, 'Description must be less than 500 characters'),
    priority: Yup.string()
        .oneOf(['LOW', 'MEDIUM', 'HIGH'], 'Invalid priority')
        .required('Priority is required'),
    assigneeId: Yup.number()
        .optional(),
});