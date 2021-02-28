export default class Section {
    constructor({ /*items,*/ renderer }, containerSelector) {
        /*this._items = items;*/
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(arr) {
        /*this._items*/arr.forEach((item) => {
            this.renderer(item);
        
        });
    }

    addItem(e, before = false) {
        if(before) {
            this._container.prepend(e);
        } else {
            this._container.append(e);
        }
      
  
    }
}