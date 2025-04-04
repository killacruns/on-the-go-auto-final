import { reactive } from 'vue'

const cart = reactive({
  items: [],
  addItem(item) {
    const existing = this.items.find(i => i.id === item.id && i.type === item.type)
    if (existing) {
      existing.quantity += 1
    } else {
      this.items.push({ ...item, quantity: 1 })
    }
  },
  removeItem(id, type) {
    // Use the parameter 'type' instead of 'item.type'
    this.items = this.items.filter(i => !(i.id === id && i.type === type))
  },
  clearCart() {
    this.items = []
  },
  get total() {
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }
})

export function useCartStore() {
  return cart
}
