import type { Post } from "../../../../commons/types/generated/types.rest";

export interface IBoardDetailUIProps {
  data?: Post;
  onClickMoveToBoardEdit: () => void;
}
