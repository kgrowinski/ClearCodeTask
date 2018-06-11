import React from 'react';

export default (props) => {
  const {id} = props.match.params;
  return(
    <div>
      {id ? id : 'none'}
    </div>
  );
}