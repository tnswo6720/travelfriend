import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function MyQuillEditor({ onChange }) {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !quill) {
      const editor = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['image', 'video'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }]
          ],
        },
      });

      editor.on('text-change', () => {
        onChange(editor.root.innerHTML);
      });

      setQuill(editor);
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quill) {
      const imageContainer = quill.container.querySelector('.ql-editor');
      imageContainer.querySelectorAll('img').forEach((img) => {
        img.style.maxWidth = '600px';
        img.style.maxHeight = '400px';
      });

      imageContainer.querySelectorAll('img').forEach((img) => {
        img.style.pointerEvents = 'auto';
      });
    }
  }, [quill]);

  return (
    <div style={{ position: 'relative', zIndex: 10, overflow: 'visible', width: '100%', height: '480px' }}>
      <div ref={quillRef} className="quill-editor" />
    </div>
  );
}
