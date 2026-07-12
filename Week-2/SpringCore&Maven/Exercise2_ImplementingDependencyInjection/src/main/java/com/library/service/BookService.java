package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository repository;

    // Setter for DI
    public void setRepository(BookRepository repository) {
        this.repository = repository;
    }

    public void addBook() {
        System.out.println("Service: Adding book");
        repository.saveBook();
    }
}