import { imageCommand } from "./imageCommand";
import { generateDescriptionCommand } from "./generateDescriptionCommand";

export const commandRegistry = {
  $image: imageCommand,
  $generate: generateDescriptionCommand,
  // Add other commands here
};
