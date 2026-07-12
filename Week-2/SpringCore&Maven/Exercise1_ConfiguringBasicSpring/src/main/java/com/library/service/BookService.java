package com.library.service;
import com.library.repository.BookRepository;
public class BookService {
    private BookRepository bookRepository;
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    public void getBookServiceDetails() {
        System.out.println("Service layer calling Repository");
        bookRepository.getBookDetails();
    }
}
