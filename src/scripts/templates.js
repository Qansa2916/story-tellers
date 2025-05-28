import { showFormattedDate } from './utils';

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export function generateMainNavigationListTemplate() {
  return `
    <li><a id="story-list-button" class="story-list-button" href="#/">Story list</a></li>
    <li><a id="bookmark-button" class="bookmark-button" href="#/bookmark">Saved Stories</a></li>
  `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="login-button" href="#/login">Login</a></li>
    <li><a id="register-button" href="#/register">Register</a></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="new-story-button" class="btn new-story-button" href="#/new">Create a story <i class="fas fa-plus"></i></a></li>
    <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
  `;
}

export function generateListEmptyTemplate() {
  return `
    <div id="story-list-empty" class="story-list__empty">
      <h2>No stories available</h2>
      <p>Currently, there are no stories to display.</p>
    </div>
  `;
}

export function generateListErrorTemplate(message) {
  return `
    <div id="story-list-error" class="story-list__error">
      <h2>Something error happened!</h2>
      <p>${message ? message : 'Use another network or report this error.'}</p>
    </div>
  `;
}

export function generateDetailErrorTemplate(message) {
  return `
    <div id="story-detail-error" class="story-detail__error">
      <h2>Something error happened!</h2>
      <p>${message ? message : 'Use another network or report this error.'}</p>
    </div>
  `;
}

export function generateStoryItemTemplate({
  id,
  name,
  description,
  photoUrl,
  createdAt,
  placeName,
}) {
  return `
    <div tabindex="0" class="story-item" data-id="${id}">
      <img class="story-item__image" src="${photoUrl}" alt="the-image-from${name}">
      <div class="story-item__body">
        <div class="story-item__main">
          <h2 id="story-title" class="story-item__title">The story from ${name}</h2>
          <div class="story-item__more-info">
            <div class="story-item__createdat">
              <i class="fas fa-calendar-alt"></i> ${showFormattedDate(createdAt, 'id-ID')}
            </div>
            <div class="story-item__location">
              <i class="fas fa-map"></i> ${placeName}
            </div>
          </div>
        </div>
        <div id="story-description" class="story-item__description">
          ${description}
        </div>
        <div class="story-item__more-info">
          <div class="story-item__author">
            Created by: ${name}
          </div>
        </div>
        <a class="btn story-item__read-more" href="#/stories/${id}">
          Read more <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

export function generateDetailImageTemplate(imageUrl = null, alt = '') {
  if (!imageUrl) {
    return `
      <img class="story-detail__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
    `;
  }

  return `
    <img class="story-detail__image" src="${imageUrl}" alt="${alt}">
  `;
}

export function generateDetailTemplate({ images, location, creatorName, createdAt, description }) {
  const createdAtFormatted = showFormattedDate(createdAt, 'id-ID');
  const imagesHtml = generateDetailImageTemplate(images, `Story by ${creatorName}`);

  return `
    <div class="story-detail__header">
      <h1 id="title" class="story-detail__title">Amazing story from ${creatorName}</h1>

      <div class="story-detail__more-info">
        <div class="story-detail__more-info__inline">
          <div id="createdat" class="story-detail__createdat" data-value="${createdAtFormatted}"><i class="fas fa-calendar-alt"></i></div>
           <div id="location-place-name" class="story-detail__location__place-name" data-value="${location.placeName}"><i class="fas fa-map"></i></div>
        </div>
        <div class="story-detail__more-info__inline">
          <div id="location-latitude" class="story-detail__location__latitude" data-value="${location.lat}">Latitude:</div>
          <div id="location-longitude" class="story-detail__location__longitude" data-value="${location.lon}">Longitude:</div>
        </div>
        <div id="author" class="story-detail__author" data-value="${creatorName}">Created by :</div>
      </div>

    </div>

    <div class="container">
      <div class="story-detail__images__container">
        <div id="images" class="story-detail__images">${imagesHtml}</div>
      </div>
    </div>

    <div class="container">
      <div class="story-detail__body">
        <div class="story-detail__body__description__container">
          <h2 class="story-detail__description__title">The Story</h2>
          <div id="description" class="story-detail__description__body">
            ${description}
          </div>
        </div>
        <div class="story-detail__body__map__container">
          <h2 class="story-detail__map__title">Location</h2>
          <div class="story-detail__map__container">
            <div id="map" class="story-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
        </div>
  
        <hr>
  
        <div class="story-detail__body__actions__container">
          <div class="story-detail__actions__buttons">
            <div id="save-actions-container"></div>
            <div id="notify-me-actions-container">
              <button id="story-detail-notify-me" class="btn btn-transparent">
                Try Notify Me <i class="far fa-bell"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}

export function generateSaveButtonTemplate() {
  return `
    <button id="story-detail-save" class="btn btn-transparent">
      Save Story <i class="far fa-bookmark"></i>
    </button>
  `;
}

export function generateRemoveButtonTemplate() {
  return `
    <button id="story-detail-remove" class="btn btn-transparent">
      Remove Story <i class="fas fa-bookmark"></i>
    </button>
  `;
}
