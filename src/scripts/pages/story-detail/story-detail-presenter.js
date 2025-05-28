import { storyMapper } from '../../data/api-mapper';

export default class StoryDetailPresenter {
  #storyId;
  #view;
  #apiModel;
  #dbModel;

  constructor(storyId, { view, apiModel, dbModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
    this.#dbModel = dbModel;
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

  async saveStory() {
    try {
      const story = await this.#apiModel.getStoryById(this.#storyId);
      await this.#dbModel.putStory(story.story);
      this.#view.saveToBookmarkSuccessfully('Success saved to boorkmark');
    } catch (error) {
      console.error('save story: error', error);
      this.#view.saveToBookmarkFailed(error.message);
    }
  }

  async removeStory() {
    try {
      await this.#dbModel.removeStory(this.#storyId);
      this.#view.removeFromBookmarkSuccessfully('Success to remove from bookmark');
    } catch (error) {
      console.error('removeStory: error:', error);
      this.#view.removeFromBookmarkFailed(error.message);
    }
  }

  async showSaveButton() {
    if (await this.#isSaved()) {
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  }

  async #isSaved() {
    return !!(await this.#dbModel.getStoryById(this.#storyId));
  }
}
