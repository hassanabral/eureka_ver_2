import React from 'react';
import EditPost from './EditPost';
import { useParams } from "react-router-dom";
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';

const EditPostWrapper = () => {
  const {id} = useParams();

  const { data: editPost } = useFirestoreDoc('posts', id);

  return (
    <EditPost initialValues={editPost} postId={id}/>
  );
};

export default EditPostWrapper;
