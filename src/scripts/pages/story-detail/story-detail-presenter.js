import { storyMapper } from '../../data/api-mapper';

export default class StoryDetailPresenter {
  #storyId;
  #view;
  #apiModel;

  constructor(storyId, { view, apiModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async showDetailMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showDetailMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async showDetail() {
    this.#view.showDetailLoading();
    try {
      const response = await this.#apiModel.getStoryById(this.#storyId);
      if (!response.ok) {
        console.error('showDetailAndMap: response:', response);
        this.#view.populateDetailError(response.message);
        return;
      }
      const dataStory = await storyMapper(response.story);
      this.#view.populateDetailAndInitialMap(response.message, dataStory);
    } catch (error) {
      console.error('showDetailAndMap: error:', error);
      this.#view.populateDetailError(error.message);
    } finally {
      this.#view.hideDetailLoading();
    }
  }

  showSaveButton() {
    if (this.#isSaved()) {
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  }

  #isSaved() {
    return false;
  }
}
