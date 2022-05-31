export default class DCItem extends ItemSheet {
    get template() {
        return `systems/dc/templates/editor/item.html`;
    }

    getData() {
        const data = super.getData();

        return data;
    }

    activateListeners(html) {
        return super.activateListeners(html);
    }

    _on_toggle_value(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        let path = `data.${el.dataset.path}`;
        this.update({path: !utils.tools.path.get(this.data, path)});
    }
}