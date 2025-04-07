// src/composables/useOrders.js
import { ref } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export function useOrders() {
  const orders = ref([]);

  async function addOrder(orderData) {
    try {
      // Add a server timestamp to the order data
      orderData.createdAt = serverTimestamp();
      // Optionally, include the user's ID if available (e.g., orderData.userId)
      const docRef = await addDoc(collection(db, "orders"), orderData);
      return docRef.id;
    } catch (error) {
      console.error("Error adding order:", error);
      throw error;
    }
  }

  async function fetchOrders(userId) {
    try {
      // Query orders where the userId matches
      const q = query(
        collection(db, "orders"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      orders.value = [];
      querySnapshot.forEach((doc) => {
        orders.value.push({ id: doc.id, ...doc.data() });
      });
      return orders.value;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  return { orders, addOrder, fetchOrders };
}
