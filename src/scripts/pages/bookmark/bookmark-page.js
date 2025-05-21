export default class BookmarkPage {
  async render() {
    return '';
  }

  async afterRender() {
    alert('Saved story pages are coming soon!');

    location.hash = '/';
  }
}
