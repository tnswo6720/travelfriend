import type { MouseEvent } from "react";
import type { Post } from "../../../../commons/types/generated/types.rest";

export interface IBoardListUIProps {
  data?:Post;
  onClickMoveToBoardNew: () => void;
  onClickMoveToBoardDetail: (event: MouseEvent<HTMLDivElement>) => void;
}
