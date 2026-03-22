import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './RichEditor.css';

const RichEditor = ({ input,placeholder, config }) => {

  return (
    <CKEditor
      data={input.value}
      editor={ ClassicEditor }
      config={{
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|',  'blockQuote',  'insertTable', '|', 'undo', 'redo'],
        width: 'auto',
        height: 'auto',
        ...config
      }}
      style={{ border: 'solid 5px red' }}
      placeholder={placeholder}
      onChange={(event, editor) => {
        return input.onChange(editor.getData())
      }
      }
    />
  )
};

export default RichEditor;