import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

export const getAvatar = (title: string) => {
  const avatar = createAvatar(initials, {
    seed: title,
  });
  return avatar.toDataUri();
};
