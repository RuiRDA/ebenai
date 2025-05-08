import React from 'react';

interface Review {
  id: number;
  name: string;
  nationality: string; // Emoji flag
  rating: number;
  maxRating: number;
  text: string;
}

const dummyReviews: Review[] = [
  {
    id: 1,
    name: 'John Doe',
    nationality: '🇺🇸', // USA
    rating: 5,
    maxRating: 5,
    text: 'Amazing service and fantastic results! Highly recommend to anyone looking for top-notch AI solutions.',
  },
  {
    id: 2,
    name: 'Maria Silva',
    nationality: '🇧🇷', // Brazil
    rating: 4,
    maxRating: 5,
    text: 'Very professional team and the project was delivered on time. The quality of work exceeded my expectations.',
  },
  {
    id: 3,
    name: 'Kenji Tanaka',
    nationality: '🇯🇵', // Japan
    rating: 5,
    maxRating: 5,
    text: 'Eben AI truly understands the nuances of artificial intelligence. Their insights were invaluable to our project.',
  },
  {
    id: 4,
    name: 'Fatima Al Fassi',
    nationality: '🇦🇪', // UAE
    rating: 4,
    maxRating: 5,
    text: 'A great partner to work with. They are responsive, knowledgeable, and dedicated to client success.',
  },
  {
    id: 5,
    name: 'Chloe Dubois',
    nationality: '🇫🇷', // France
    rating: 5,
    maxRating: 5,
    text: 'The solutions provided were innovative and perfectly tailored to our needs. Excellent communication throughout the process.',
  },
];

const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 md:mb-16">
          What Our Clients Say
        </h2>
        <div className="flex overflow-x-auto space-x-6 md:space-x-8 pb-8 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          {dummyReviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-80 md:w-96 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {/* Placeholder for client image - can be added later */}
                {/* <img src={`https://i.pravatar.cc/50?u=${review.id}`} alt={review.name} className="w-12 h-12 rounded-full mr-4" /> */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{review.name} <span className="text-lg">{review.nationality}</span></h3>
                  <p className="text-yellow-500 text-sm">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(review.maxRating - review.rating)}
                    <span className="ml-2 text-gray-600">({review.rating}/{review.maxRating})</span>
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;