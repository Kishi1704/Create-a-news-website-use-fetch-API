'use strict';
//User class
class User {
  pageSize = 5;
  category = 'general';
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
  //News method
  async getNews(page = 1) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${this.category}&pageSize=${this.pageSize}&page=${page}&apiKey=dc14120616b94a0b870858d30f1d3b75`
      );
      if (!res.ok) throw new Error('Problem with Database');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}
