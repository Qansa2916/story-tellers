import {
  generateLoaderAbsoluteTemplate,
  generateStoryItemTemplate,
  generateListEmptyTemplate,
  generateListErrorTemplate,
} from '../../templates';
import BookmarkPresenter from './boorkmark-presenter';
import Database from '../../data/database';
import Map from '../../../utils/map';
export default class BookmarkPage {
  #map = null;
  #presenter = null;

  async render() {
    return `<section>
        <div class="story-list__map__container">
          <div id="map" class="story-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">List Of Bookmarked Stories</h1>

        <div class="story-list__container">
          <div id="story-list"></div>
          <div id="story-list-loading-container"></div>
        </div>
      </section>`;
  }

  async afterRender() {
    this.#presenter = new BookmarkPresenter({
      view: this,
      model: Database,
    });
    await this.#presenter.initialGalleryAndMap();
  }

  async populateBookmarkedStories(message, stories) {
    if (stories.length <= 0) {
      this.populateListEmpty();
      return;
    }

    let html = '';

    for (const data of stories) {
      const placeName = await Map.getPlaceNameByCoordinate(data.lat, data.lon);

      if (this.#map) {
        const coordinate = [data.lat, data.lon];
        const markerOptions = { alt: data.title };
        const popupOptions = { content: data.title };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }

      html += generateStoryItemTemplate({
        ...data,
        placeName,
      });
    }

    document.getElementById('story-list').innerHTML = `
        <div class="story-list">${html}</div>
      `;
  }

  populateBookmarkedListEmpty() {
    document.getElementById('story-list').innerHTML = generateListEmptyTemplate();
  }

  populateBookmarkedListError(message) {
    document.getElementById('story-list').innerHTML = generateListErrorTemplate(message);
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 10,
      locate: true,
    });
  }

  showLoading() {
    document.getElementById('story-list-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-list-loading-container').innerHTML = '';
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }
}
