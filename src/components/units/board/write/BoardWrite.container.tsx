import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import BoardWriteUI from "./BoardWrite.presenter";
// import ReactQuill from 'react-quill';
import MyQuillEditor from '../../../CustomEditor/MyQuillEditor';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Quill의 스타일 시트를 추가해줍니다.

const MyQuillEditorDynamic = dynamic(
  () => import('../../../CustomEditor/MyQuillEditor'),
  { ssr: false }
);

export default function BoardWrite() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    author: "",
    password: "",
    title: "",
    contents: "",
    youtubeUrl: "",
    files: [] as File[], // 파일 업로드를 위한 배열
  });

  const [errors, setErrors] = useState({
    authorError: "",
    passwordError: "",
    titleError: "",
    contentsError: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const newFiles = files ? Array.from(files) as File[] : []; // 파일 배열 복사

      setFormData({
        ...formData,
        files: newFiles,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      authorError: "",
      passwordError: "",
      titleError: "",
      contentsError: "",
    };

    if (!formData.author) {
      isValid = false;
      newErrors.authorError = "작성자를 입력해주세요.";
    }
    if (!formData.password) {
      isValid = false;
      newErrors.passwordError = "비밀번호를 입력해주세요.";
    }
    if (!formData.title) {
      isValid = false;
      newErrors.titleError = "제목을 입력해주세요.";
    }
    if (!formData.contents) {
      isValid = false;
      newErrors.contentsError = "내용을 입력해주세요.";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Quill 에디터 내용 변경 시 실행될 콜백 함수
  const handleQuillChange = (value) => {
    // Quill 에디터 내용 업데이트
    setFormData((prevData) => ({
      ...prevData,
      contents: value,
    }));


  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataForRequest = new FormData();

    // Quill 에디터에서 생성된 HTML 내용을 추가
    formDataForRequest.append("contents", formData.contents);

    // "post" 파트에는 파일을 제외한 다른 데이터를 JSON 문자열로 변환하여 추가
    // 여기서 files 필드를 제외합니다.
    const { files, ...restOfData } = formData;
    formDataForRequest.append("post", JSON.stringify(restOfData));

    // 각 파일을 "files" 키로 추가
    files && files.forEach((file, index) => {
      formDataForRequest.append(`files`, file); // 인덱스를 키에 포함
    });

    try {
      const response = await axios.post('http://localhost:8080/api/posts/create', formDataForRequest, {
        headers: {
          'Content-Type': 'multipart/form-data', // 파일 업로드 시 Content-Type 설정
        },
      });

      if (response.data.id) {
        alert("게시글이 성공적으로 등록되었습니다.");
        router.push(`/boards/${response.data.id}`);
      } else alert("게시글 등록에 실패하였습니다.");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
  return (
    <div>
      <BoardWriteUI
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleEditorChange={handleQuillChange}
        MyQuillEditor={MyQuillEditorDynamic} // MyQuillEditor를 props로 전달
      />
    </div>
  );
}
