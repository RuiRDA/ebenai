import React, { useState, useEffect, useRef } from 'react';

interface Review {
  id: number;
  name: string;
  nationality: string; // Emoji flag
  rating: number;
  maxRating: number;
  text: string;
}

const dummyReviewsData: Review[] = [
  {
    id: 1,
    name: 'John Doe',
    nationality: '🇺🇸',
    rating: 5,
    maxRating: 5,
    text: 'Amazing service and fantastic results! Highly recommend to anyone looking for top-notch AI solutions.',
  },
  {
    id: 2,
    name: 'Maria Silva',
    nationality: '🇧🇷',
    rating: 4,
    maxRating: 5,
    text: 'Very professional team and the project was delivered on time. The quality of work exceeded my expectations.',
  },
  {
    id: 3,
    name: 'Kenji Tanaka',
    nationality: '🇯🇵',
    rating: 5,
    maxRating: 5,
    text: 'Eben AI truly understands the nuances of artificial intelligence. Their insights were invaluable to our project.',
  },
  {
    id: 4,
    name: 'Fatima Al Fassi',
    nationality: '🇦🇪',
    rating: 4,
    maxRating: 5,
    text: 'A great partner to work with. They are responsive, knowledgeable, and dedicated to client success.',
  },
  {
    id: 5,
    name: 'Chloe Dubois',
    nationality: '🇫🇷',
    rating: 5,
    maxRating: 5,
    text: 'The solutions provided were innovative and perfectly tailored to our needs. Excellent communication throughout the process.',
  },
];

const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Duplicate reviews for infinite scroll effect
  const duplicatedReviews = [...dummyReviewsData, ...dummyReviewsData, ...dummyReviewsData];
  const actualReviewsCount = dummyReviewsData.length;

  const scrollSpeed = 5000; // Time in ms for auto-scroll

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (isHovering) {
      resetTimeout();
      return;
    }

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextOverallIndex = prevIndex + 1;
        if (reviewsContainerRef.current) {
          const scrollWidth = reviewsContainerRef.current.scrollWidth;
          // const clientWidth = reviewsContainerRef.current.clientWidth; // Removed unused variable
          // Assuming each card has roughly the same width
          // This calculation might need adjustment based on actual card widths
          const cardWidth = (scrollWidth / duplicatedReviews.length);
          
          let targetScrollLeft = nextOverallIndex * cardWidth;

          // Handle loop around for infinite effect
          if (nextOverallIndex >= actualReviewsCount * 2) { // Reached the end of the second set
            // Jump back to the start of the second set without animation
            reviewsContainerRef.current.scrollTo({ left: actualReviewsCount * cardWidth, behavior: 'auto' });
            setCurrentIndex(actualReviewsCount); // Set index to the start of the "visible" second set
            targetScrollLeft = (actualReviewsCount + 1) * cardWidth; // Scroll to the next item in the second set
          }
          
          reviewsContainerRef.current.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth',
          });
        }
        return nextOverallIndex >= actualReviewsCount * 2 ? actualReviewsCount : nextOverallIndex;
      });
    }, scrollSpeed);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, isHovering, actualReviewsCount, duplicatedReviews.length]);

  // Initial scroll to the start of the "middle" set of reviews for seamless loop
   useEffect(() => {
    if (reviewsContainerRef.current) {
      const scrollWidth = reviewsContainerRef.current.scrollWidth;
      const cardWidth = (scrollWidth / duplicatedReviews.length);
      const initialScrollLeft = actualReviewsCount * cardWidth;
      reviewsContainerRef.current.scrollTo({ left: initialScrollLeft, behavior: 'auto' });
      setCurrentIndex(actualReviewsCount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualReviewsCount, duplicatedReviews.length]); // Run only once on mount


  const handleDotClick = (index: number) => {
    const targetOverallIndex = actualReviewsCount + index; // Target the item in the middle set
    setCurrentIndex(targetOverallIndex);
    if (reviewsContainerRef.current) {
        const scrollWidth = reviewsContainerRef.current.scrollWidth;
        const cardWidth = (scrollWidth / duplicatedReviews.length);
        reviewsContainerRef.current.scrollTo({
            left: targetOverallIndex * cardWidth,
            behavior: 'smooth',
        });
    }
  };
  
  const displayIndex = currentIndex % actualReviewsCount;

  return (
    <section 
      id="reviews" 
      className="py-12 md:py-20 bg-gradient-to-b from-blue-50 via-blue-100 to-transparent"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 md:mb-16">
          What Our Clients Say
        </h2>
        <div 
          ref={reviewsContainerRef}
          className="flex overflow-x-hidden space-x-6 md:space-x-8 pb-8" // overflow-x-hidden to hide scrollbar
          style={{ scrollSnapType: 'x mandatory' }} // Helps with snapping but auto-scroll overrides
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`} // Ensure unique keys for duplicated items
              className="flex-shrink-0 w-80 md:w-96 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex items-center mb-4">
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
        <div className="flex justify-center space-x-2 mt-8">
          {dummyReviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                displayIndex === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;