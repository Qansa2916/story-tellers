import {
  generateLoaderAbsoluteTemplate,
  generateRemoveButtonTemplate,
  generateDetailErrorTemplate,
  generateDetailTemplate,
  generateSaveButtonTemplate,
} from '../../templates';
import { createCarousel } from '../../utils';
import StoryDetailPresenter from './story-detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
import * as StoryAPI from '../../data/api';
import Map from '../../../utils/map';

export default class StoryDetailPage {
  #presenter = null;
  #form = null;
  #map = null;

  async render() {
    return `
     
      <section>
        <div class="story-detail__container">
          <div id="story-detail" class="story-detail"></div>
          <div id="detail-loading-container"></div>
        </div>
      </section>
      
      <section class="container">
       
        <div class="story-detail__comments__container">
          <div class="story-detail__comments-form__container">
            <form id="comments-list-form" class="story-detail__comments-form__form">
              <div id="submit-button-container">
              </div>
            </form>
          </div>
         
          
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoryDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: StoryAPI,
    });
    this.#setupForm();
    this.#presenter.showDetail();
  }

  async populateDetailAndInitialMap(message, data) {
    document.getElementById('story-detail').innerHTML = generateDetailTemplate({
      images: data.photoUrl,
      location: data.location,
      creatorName: data.name,
      createdAt: data.createdAt,
      description: data.description,
    });

    // Carousel images
    createCarousel(document.getElementById('images'));

    // Map
    await this.#presenter.showDetailMap();
    if (this.#map) {
      const storyCoordinate = [data.location.lat, data.location.lon];
      const markerOptions = { alt: data.name };
      const popupOptions = { content: data.name };
      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    }

    // Actions buttons
    this.#presenter.showSaveButton();
    this.addNotifyMeEventListener();
  }

  populateDetailError(message) {
    document.getElementById('story-detail').innerHTML = generateDetailErrorTemplate(message);
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 15,
    });
  }

  #setupForm() {
    this.#form = document.getElementById('comments-list-form');
    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        body: this.#form.elements.namedItem('body').value,
      };
    });
  }

  clearForm() {
    this.#form.reset();
  }

  renderSaveButton() {
    document.getElementById('save-actions-container').innerHTML = generateSaveButtonTemplate();

    document.getElementById('story-detail-save').addEventListener('click', async () => {
      alert('Saved story pages are coming soon!');
    });
  }

  renderRemoveButton() {
    document.getElementById('save-actions-container').innerHTML = generateRemoveButtonTemplate();

    document.getElementById('story-detail-remove').addEventListener('click', async () => {
      alert('Saved story pages are coming soon!');
    });
  }

  addNotifyMeEventListener() {
    document.getElementById('story-detail-notify-me').addEventListener('click', () => {
      alert('Notification is coming soon!');
    });
  }

  showDetailLoading() {
    document.getElementById('detail-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideDetailLoading() {
    document.getElementById('detail-loading-container').innerHTML = '';
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  // showCommentsLoading() {
  //   document.getElementById('comments-list-loading-container').innerHTML =
  //     generateLoaderAbsoluteTemplate();
  // }

  hideCommentsLoading() {
    document.getElementById('comments-list-loading-container').innerHTML = '';
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Tanggapi
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit">Tanggapi</button>
    `;
  }
}
