import type { StoryParams, StoryProvider } from "../domain/Provider";
import type { Story } from "../domain/Story";

export class GenerateChildrenStory {
  constructor(private storyProvider: StoryProvider) {}

  public async execute(input: StoryParams): Promise<Story> {
    return await this.storyProvider.generateStory(input);
  }
}
