import type { ChangeEvent } from "react";
import type { Post } from "../../../../commons/types/generated/types.rest";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Post;
}

export interface IBoardWriteUIProps {
  authorError: string;
  passwordError: string;
  titleError: string;
  contentsError: string;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEditorChange: (value: string) => void; // 이 부분 추가
  onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickAddressSearch: () => void;
  onCompleteAddressSearch: (data: any) => void;
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  isActive: boolean;
  isEdit: boolean;
  data?: Post;
  isOpen: boolean;
  zipcode: string;
  address: string;
}

export interface ISubmitButtonProps {
  isActive: boolean;
}
