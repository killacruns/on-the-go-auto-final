<template>
    <div class="review-section">
      <h3>User Reviews</h3>
      
      <!-- Average Rating -->
      <div class="average-rating" v-if="reviews.length">
        <span class="rating-stars">
          <i v-for="n in 5" :key="n" 
             :class="n <= averageRating ? 'fas fa-star' : 'far fa-star'">
          </i>
        </span>
        <span class="average-text">{{ averageRating.toFixed(1) }} out of 5</span>
      </div>
  
      <!-- Existing Reviews -->
      <div class="reviews-list" v-if="reviews.length">
        <div v-for="(review, index) in reviews" :key="index" class="review">
          <div class="review-header">
            <span class="review-rating">
              <i v-for="n in 5" :key="n" 
                 :class="n <= review.rating ? 'fas fa-star' : 'far fa-star'">
              </i>
            </span>
            <span class="review-author">- {{ review.author }}</span>
          </div>
          <p class="review-text">"{{ review.text }}"</p>
        </div>
      </div>
      <p v-else>No reviews yet.</p>
  
      <!-- Review Submission Form -->
      <div class="review-form">
        <h4>Submit Your Review</h4>
        <textarea v-model="newReviewText" placeholder="Write your review..." rows="3"></textarea>
        <div class="rating-input">
          <label>Rating:</label>
          <span class="rating-stars">
            <i 
              v-for="star in 5" 
              :key="star" 
              :class="star <= newReviewRating ? 'fas fa-star' : 'far fa-star'" 
              @click="setRating(star)"
            ></i>
          </span>
        </div>
        <button class="btn btn-submit" @click="submitReview">Submit Review</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const reviews = ref([
    { author: 'John D.', text: 'Excellent quality, very durable!', rating: 5 },
    { author: 'Alice S.', text: 'Good value for money.', rating: 4 },
    // You can include more initial reviews as needed.
  ])
  
  const newReviewText = ref('')
  const newReviewRating = ref(0)
  const error = ref('')
  
  // Compute the average rating
  const averageRating = computed(() => {
    if (reviews.value.length === 0) return 0
    const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.value.length
  })
  
  function setRating(star) {
    newReviewRating.value = star
  }
  
  function submitReview() {
    error.value = ''
    if (!newReviewText.value.trim() || newReviewRating.value === 0) {
      error.value = 'Please enter a review and select a rating.'
      return
    }
    reviews.value.push({
      author: 'Anonymous', // You can replace with the logged in user's name
      text: newReviewText.value,
      rating: newReviewRating.value
    })
    newReviewText.value = ''
    newReviewRating.value = 0
  }
  </script>