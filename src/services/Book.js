import axios from 'axios';

const URL = "http://localhost:8080/api/books/";

const getBooks = async() => {
    try{
        const resposne = await axios.get(URL);
        return resposne.data;
    }catch(error){
        console.error(error);
    }
}

const addBook = async(book) => {
    try{
        const response = await axios.post(URL, book);
        return response.data;
    }catch(error){
        console.error(error);
    }
}


const deleteBook = async(id) => {
    try{
        const response = await axios.delete(URL + id);
        return response.data;
    }catch(error){
        console.error(error);
    }
}

const updateBook = async(book) => {
    try{
        const response = await axios.put(URL + book.id, book);
        return response.data;
    }catch(error){
        console.error(error);
    }
}

const getBookOrderByDate = async() => { 
    try{
        const response = await axios.get(URL + "getByPublicateDate");
        return response.data;
    }catch(error){
        console.error(error);
    }
}

export default{
    getBooks,
    addBook,
    deleteBook,
    updateBook,
    getBookOrderByDate
}