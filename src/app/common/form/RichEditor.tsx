import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './RichEditor.css';

interface RichEditorProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  config?: any;
}

const RichEditor = ({ value, onChange, placeholder, config }: RichEditorProps) => {
  return (
    <CKEditor
      data={value || ''}
      editor={ClassicEditor}
      config={{
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'blockQuote', 'insertTable', '|', 'undo', 'redo'],
        width: 'auto',
        height: 'auto',
        ...config
      }}
      placeholder={placeholder}
      onChange={(event: any, editor: any) => {
        if (onChange) onChange(editor.getData());
      }}
    />
  );
};

export default RichEditor;
