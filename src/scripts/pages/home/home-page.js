import {
  generateLoaderAbsoluteTemplate,
  generateStoryItemTemplate,
  generateListEmptyTemplate,
  generateListErrorTemplate,
} from '../../templates';
import HomePresenter from './home-presenter';
import * as StoryAPI from '../../data/api';
import Map from '../../../utils/map';

export default class HomePage {
  #presenter = null;
  #map = null;

  async render() {
    return `
    <section >
    <div class="head-home-page">
    <h1>Hello Friends..</h1>
    <p>Let's create and share a beautiful stories you have with others</p>
    <p> which may make you happy and joyful.</p>
    </div>
    </section>
      <section>
        <div class="story-list__map__container">
          <div id="map" class="story-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">List Of Stories</h1>

        <div class="story-list__container">
          <div id="story-list"></div>
          <div id="story-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: StoryAPI,
    });

    await this.#presenter.initialGalleryAndMap();
  }

  async populateStoriesList(message, stories) {
    if (stories.length <= 0) {
      this.populateListEmpty();
      return;
    }

    let html = '';

    for (const data of stories) {
      console.log('data', data.location);
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

  populateListEmpty() {
    document.getElementById('story-list').innerHTML = generateListEmptyTemplate();
  }

  populateListError(message) {
    document.getElementById('story-list').innerHTML = generateListErrorTemplate(message);
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 10,
      locate: true,
    });
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  showLoading() {
    document.getElementById('story-list-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-list-loading-container').innerHTML = '';
  }
}
