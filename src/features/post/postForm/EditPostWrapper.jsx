import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import EditPost from './EditPost';
import { useParams } from "react-router-dom";

const EditPostWrapper = () => {
  const {id} = useParams();

  const editPostQuery = useMemo(() => ({
    collection: 'posts',
    doc: id,
    storeAs: 'editPost'
  }), [id]);

  useFirestoreConnect(editPostQuery);

  const editPost = useSelector((state) => (state.firestore.data.editPost));

  return (
    <EditPost initialValues={editPost} postId={id}/>
  );
};

export default EditPostWrapper;