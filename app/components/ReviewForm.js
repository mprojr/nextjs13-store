import { useState } from 'react';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, review, rating }),
    });

    if (res.ok) {
      alert('Review submitted');
      setName('');
      setReview('');
      setRating('');
    } else {
      alert('Failed to submit review');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Review</label>
        <textarea value={review} onChange={(e) => setReview(e.target.value)}></textarea>
      </div>
      <div>
        <label>Rating</label>
        <input value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
