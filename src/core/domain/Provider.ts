import type { Story } from "./Story";

export interface StoryParams {
  keywords: string;
}

export interface StoryProvider {
  generateStory(input: StoryParams): Promise<Story>;  
}