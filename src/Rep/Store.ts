export class Store {
    save(data: object) {
        localStorage.setItem('data', JSON.stringify(data));
    }

    read() {
        return [JSON.parse(localStorage.getItem('data'))]
    }
}