// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import BookList from '@/views/BookList.vue'
import EmployeeList from '@/views/EmployeeList.vue' // đổi tên component
import PublisherList from '@/views/PublisherList.vue'
import BookDetail from "@/components/BookDetail.vue";
import Borrows from '@/views/Borrows.vue'
import login from '@/components/Login.vue'
import register from '@/components/Register.vue'
import BorrowHistory from '@/components/BorrowHistory.vue'
import BorrowBook from '@/components/BorrowBook.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/book', component: BookList },
  { path: '/employee', component: EmployeeList }, 
  { path: '/publisher', component: PublisherList },
  { path: "/books/:id", component: BookDetail },
  { path: "/borrow", component: Borrows },
  { path: "/login", component: login },
  { path: "/register", component: register },
  { path: "/borrow-history", component: BorrowHistory },
  { path: "/borrow-book", component: BorrowBook },
]


export default createRouter({
  history: createWebHistory(),
  routes,
})
