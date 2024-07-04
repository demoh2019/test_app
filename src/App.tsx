import React, { useState, ChangeEvent, FormEvent } from 'react';
import './App.css';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors: Partial<FormData> = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        }

        if (formData.message.length > 500) {
            errors.message = 'Message cannot exceed 500 characters';
        }

        return errors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setSubmittedData(formData);
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        pattern="^[a-zA-Z\s]+$"
                        title="Name should not contain digits or special symbols"
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={500}
                    ></textarea>
                    {errors.message && <p className="error">{errors.message}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>
            {submittedData && (
                <div>
                    <h2>Submitted Data:</h2>
                    <p>Name: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>Message: {submittedData.message}</p>
                </div>
            )}
        </div>
    );
};

export default App;
