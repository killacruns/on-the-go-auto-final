<template>
    <div class="faq-toggle-container">
      <!-- Toggle Button (Always Visible) -->
      <div class="faq-toggle-btn" @click="toggleFAQ">
        <i class="fa-solid fa-question-circle"></i>
      </div>
      <!-- FAQ Panel (Collapsible) -->
      <div class="faq-panel" v-if="isOpen">
        <h3 class="faq-title">Frequently Asked Questions</h3>
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleFaqItem(index)">
            <h4>{{ faq.question }}</h4>
            <i :class="faq.open ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
          </div>
          <div v-if="faq.open" class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isOpen = ref(false)
  const faqs = ref([
    {
      question: "How do I place an order?",
      answer: "Browse our products, add your desired items to the cart, and complete the checkout process.",
      open: false
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept major credit/debit cards and plan to include additional payment options soon.",
      open: false
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes, we use Firebase authentication and secure protocols to keep your information safe.",
      open: false
    },
    {
      question: "Can I track my order?",
      answer: "Absolutely! After placing an order, you'll receive tracking details via email.",
      open: false
    },
    {
      question: "What if an item is out of stock?",
      answer: "If an item is unavailable, please check back later or contact customer support for assistance.",
      open: false
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our customer support via the live chat widget or the contact form on our website.",
      open: false
    },
    {
      question: "How do I book a mechanic service?",
      answer: "Simply navigate to the Mechanics page, select a service, and follow the booking instructions.",
      open: false
    }
  ])
  
  function toggleFAQ() {
    isOpen.value = !isOpen.value
  }
  
  function toggleFaqItem(index) {
    faqs.value[index].open = !faqs.value[index].open
  }
  </script>
  