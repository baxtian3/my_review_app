import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewComponent() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', rating: 1 });
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/reviews') 
      .then(response => {
        console.log('Fetched reviews:', response.data);
        setReviews(response.data);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingReview) {
      axios.put(`http://localhost:5000/reviews/${editingReview._id}`, form)
        .then(response => {
          setReviews(reviews.map(review => (review._id === editingReview._id ? response.data : review)));
          setEditingReview(null);
          setForm({ title: '', content: '', rating: 1 });
        })
        .catch(error => console.error('Error updating review:', error));
    } else {
      axios.post('http://localhost:5000/reviews', form) 
        .then(response => {
          console.log('Review submitted:', response.data);
          setReviews([...reviews, response.data]);
          setForm({ title: '', content: '', rating: 1 });
        })
        .catch(error => console.error('Error submitting review:', error));
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setForm({ title: review.title, content: review.content, rating: review.rating });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/reviews/${id}`) 
      .then(() => {
        console.log('Review deleted:', id);
        setReviews(reviews.filter(review => review._id !== id));
      })
      .catch(error => console.error('Error deleting review:', error));
  };

  return (
    <div>
      <h2>{editingReview ? 'Edit Review' : 'Submit a Review'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingReview ? 'Update' : 'Submit'}</button>
      </form>

      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <h3>{review.title}</h3>
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
            <button onClick={() => handleEdit(review)}>Edit</button>
            <button onClick={() => handleDelete(review._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewComponent;
