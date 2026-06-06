import type { StoryParams, StoryProvider } from "../domain/Provider";
import type { Story } from "../domain/Story";

export class GenerateChildrenStoryUseCase {
  constructor(private storyProvider: StoryProvider) {}

  public async execute(input: StoryParams): Promise<Story> {
    try {
      const story = await this.storyProvider.generateStory(input);
      return story;
    } catch {
      return {
        title: "Error",
        content: "Lo siento, hubo un problema al crear tu cuento. Por favor intenta de nuevo.",
      };
    }
  }
}
