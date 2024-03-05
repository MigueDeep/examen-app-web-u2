<template>
    <div class="container mt-5">
        <h1>Libros</h1>
        <div class="row mt-5 ">
            <div id="carouselExample" class="carousel slide carousel-card">
                <button class="btn btn-primary mx-2" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <div class="carousel-inner">
                    <div class="carousel-item active card-caro" v-for="book in data">
                        <div class="card" style="width: 18rem;">
                            <img src="" class="card-img-top" alt="imagen del libro">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <span>
                                        {{ book.id }} -
                                    </span>
                                    {{ book.name }}
                                </h5>
                                <p class="card-text">{{ book.author }}</p>
                                <p class="card-text">{{ book.publication_date }}</p>

                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-8">
                <div class="order-buttons">
                    <button @click="orderByAuthor" class="btn btn-primary">Ordenar por autor</button>
                    <button @click="orderByDesc" class="btn btn-primary">Ordenar por fecha (desc)</button>
                    <button class="btn btn-primary">Mostrar si tiene imagen</button>
                </div>
                <div class="info-cards">
                    <div class="card mt-4" style="width: 18rem;" draggable="true" v-for="book in data"
                        @dragstart="onDragStart($event, book)">
                        <img :src="book.image_book" class="card-img-top" alt="imagen del libro">
                        <div class="card-body">
                            <h5 class="card-title">
                                <span>
                                    {{ book.id }} -
                                </span>
                                {{ book.name }}
                            </h5>
                            <p class="card-text">{{ book.author }}</p>
                            <p class="card-text">{{ book.publication_date }}</p>

                        </div>
                    </div>
                </div>
            </div>
            <div class="actions-buttons col-4">
                <!-- Button modal -->
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Registrar libro
                </button>

                <!-- Modal register-->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Registrar libro</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    @click="resetForm"></button>
                            </div>
                            <div class="modal-body">
                                <form action="">
                                    <FormulateForm name="my-form" v-model="formValues" @submit="submitForm"
                                        @reset="resetForm">

                                        <div class="mb-3">
                                            <label for="name" class="form-label">Libro</label>
                                            <FormulateInput type="text" id="name" name="name" validation="^required"
                                                :validation-messages="{
                                                required: 'El nombre del libro es requerido',
                                            }" />
                                        </div>

                                        <div class="mb-3">
                                            <label for="name" class="form-label">Autor</label>
                                            <FormulateInput type="text" id="name" name="author"
                                                validation="^required|min:4,length|matches:/^[a-zA-Z\s]*$/"
                                                :validation-messages="{
                        required: 'El nombre del autor es requerido',
                        min: 'El nombre del autor debe tener al menos 4 caracteres',
                        matches: 'El nombre del autor no puede contener números',
                    }" />
                                        </div>

                                        <div class="mb-3">
                                            <label for="name" class="form-label">Fecha de publicación</label>
                                            <FormulateInput type="date" id="name" name="publication_date"
                                                validation="^required" :validation-messages="{
                        required: 'La fecha de publicación es requerida',
                        before: 'La fecha de publicación no puede ser mayor a la fecha actual',
                    }" />
                                        </div>

                                        <div class="mb-3">
                                            <label for="name" class="form-label">Imagen del libro (url)</label>
                                            <FormulateInput type="text" id="name" name="image_book"
                                                validation="^required" :validation-messages="{
                        required: 'La url de la imagen es requerida',
                    }" />
                                        </div>
                                        <hr>
                                        <button type="submit" @click="submitForm"
                                            class="btn btn-primary mx-2 send">Enviar</button>
                                        <button type="reset" @click="resetForm" class="btn btn-outline-danger">Limpiar
                                            campos</button>
                                    </FormulateForm>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal update-->
                <b-modal v-if="updateBook" v-model="showUpdateModal" title="Actualizar Libro" hide-footer>
                    <FormulateForm name="my-form" v-model="formUpdateValues" @submit="updateBookForm" @reset="resetForm">

                        <div class="mb-3">
                            <label for="name" class="form-label">Libro</label>
                            <FormulateInput type="text" id="name" name="name" validation="^required"
                                :validation-messages="{
                                required: 'El nombre del libro es requerido',
                            }" />
                        </div>

                        <div class="mb-3">
                            <label for="name" class="form-label">Autor</label>
                            <FormulateInput type="text" id="name" name="author"
                                validation="^required|min:4,length|matches:/^[a-zA-Z\s]*$/" :validation-messages="{
                        required: 'El nombre del autor es requerido',
                        min: 'El nombre del autor debe tener al menos 4 caracteres',
                        matches: 'El nombre del autor no puede contener números',
                    }" />
                        </div>

                        <div class="mb-3">
                            <label for="name" class="form-label">Fecha de publicación</label>
                            <FormulateInput type="date" id="name" name="publication_date" validation="^required"
                                :validation-messages="{
                        required: 'La fecha de publicación es requerida',
                        before: 'La fecha de publicación no puede ser mayor a la fecha actual',
                    }" />
                        </div>

                        <div class="mb-3">
                            <label for="name" class="form-label">Imagen del libro (url)</label>
                            <FormulateInput type="text" id="name" name="image_book" validation="^required"
                                :validation-messages="{
                        required: 'La url de la imagen es requerida',
                    }" />
                        </div>
                        <hr>
                        <button type="submit" class="btn btn-primary mx-2 send">Actualizar</button>
                        <button type="reset" @click="resetForm" class="btn btn-outline-danger">Limpiar campos</button>
                    </FormulateForm>
                </b-modal>

                <div class="drop-update mt-5" @drop="onDropUpdate($event, 1)" @dragover.prevent @dragenter.prevent>
                    <h2>Actualizar</h2>
                </div>
                <div class="drop-delete mt-5" @drop="onDropDelete($event, 1)" @dragover.prevent @dragenter.prevent>
                    <h2>Eliminar</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import booksService from '../services/Book.js';

export default {
    data() {
        return {
            formValues: {},
            formUpdateValues: {},
            data: [],
            dropBook: null,
            updateBook: null,
            showUpdateModal: false,
        }
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        resetForm: function () {
            this.formValues = {};
            this.$formulate.reset('my-form');
        },
        submitForm: function (values) {
            this.addBook(values);
            location.reload();
        },
        updateBookForm: function (values) {
            this.updateBookF(values);
            location.reload();
        },
        orderByAuthor() {
            this.data.sort((a, b) => {
                if (a.author < b.author) {
                    return -1;
                }
                if (a.author > b.author) {
                    return 1;
                }
                return 0;
            });
        },
        orderByDesc() {
            this.orderDesc();
        },
        async getBooks() {
            try {
                const data = await booksService.getBooks();
                const newData = data.data.map((book) => {
                    return {
                        ...book,
                        publication_date: book.publication_date ? this.formatDate(book.publication_date) : null,
                    };
                });
                this.data = newData;
            } catch (error) {
                console.log(error);
            }
        },
        async addBook(formValues) {
            try {
                const data = await booksService.addBook(formValues);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook(id) {
            try {
                const data = await booksService.deleteBook(id);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async updateBookF(formUpdateValues) {
            try {
                const data = await booksService.updateBook(formUpdateValues);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async orderDesc () {
            try {
                const data = await booksService.getBookOrderByDate();
                const newData = data.data.map((book) => {
                    return {
                        ...book,
                        publication_date: book.publication_date ? this.formatDate(book.publication_date) : null,
                    };
                });
                this.data = newData;
            } catch (error) {
                console.log(error);
            }
        },
        onDragStart(event, book) {
            this.dropBook = book.id;
            this.updateBook = book;
        },
        onDropDelete(event, id) {
            const idBook = this.dropBook;
            console.log('drop delete', idBook);
            this.deleteBook(idBook);
            location.reload();
        },
        onDropUpdate(event, id) {   
            console.log('drop update', this.updateBook);
            this.formUpdateValues = this.updateBook;
            this.showUpdateModal = true;
        },
        formatDate(dateString) {
            return new Date(dateString).toISOString().slice(0, 10);
        },
        

    },
}
</script>

<style>
.carousel-card {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 50%;
    height: 50%;
    margin-top: 5%;
}


.order-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10%;
}

.actions-buttons {
    margin-top: 10%;
}

.info-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-top: 5%;
}

.drop-update {
    margin-bottom: 10px;
    padding: 10px;
    border: 3px dashed #c69429;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    height: 200px;
}

.drop-delete {
    margin-bottom: 10px;
    padding: 10px;
    border: 3px dashed hsl(0, 66%, 47%);
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    height: 200px;
}

.drop-update:hover {
    background-color: #c69429;
    color: white;
}

.drop-delete:hover {
    background-color: hsl(0, 66%, 47%);
    color: white;
}

.send {
    width: 10rem;
}

input {
    width: 200%;
}
</style>
