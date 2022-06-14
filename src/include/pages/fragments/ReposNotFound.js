import React from 'react';
function ReposNotFound(props) {

  return (
    <div className="empty-list center-empty-repository">
      <div className="empty-list__icon"></div>
      <p className="description-window">
        Repository list is empty</p>
    </div>
  );
}

export default ReposNotFound;