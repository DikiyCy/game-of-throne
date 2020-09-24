export default class GotServise {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Error, status: ${res.status}`);
        }
        const some = await res.json();
        return some;
    }
    async getAllCharacters() {
        const result = await this.getResource(`/characters?page=5&pageSize=10`);
        return result.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const result = await this.getResource(`/characters/${id}/`);
        return this._transformCharacter(result);
    }
    async getAllHouses() {
        const result = await this.getResource(`/houses?page=5&pageSize=10`);
        return result.map(this._transformCharacter);
    }
    async getHouse(id) {
        const result = await this.getResource(`/houses/${id}/`);
        return this._transformCharacter(result);
    }
    async getAllBooks() {
        const result = await this.getResource(`/books?page=5&pageSize=10`);
        return result.map(this._transformCharacter);
    }
    async getBook(id) {
        const result = await this.getResource(`/books/${id}/`);
        return this._transformCharacter(result);
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return ')-: no data :-('
        }
    }
    _transformCharacter(char) {
        return {
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        };
    }
    _transformHouses(house) {
        return {
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            world: this.isSet(house.world),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }
    _transformBooks(book) {
        return {
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    }
}
