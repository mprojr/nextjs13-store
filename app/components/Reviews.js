import { useEffect, useState } from 'react';

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            if (!productId) return;

            try {
                const res = await fetch(`/api/reviews?productId=${productId}`);
                const data = await res.json();
                setReviews(data.reviews);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setIsLoading(false);
            }
        }

        fetchReviews();
    }, [productId]);

    if (isLoading) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div>
            <h2>Customer Reviews</h2>
            {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                    <p className="font-semibold">{review.name}</p>
                    <p>{review.review}</p>
                    <p>Rating: {review.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
