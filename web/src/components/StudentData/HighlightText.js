import React from 'react';


export default ({
  text,
  positions = []
}) => {
  const textToHighlight = positions.map(([firstPos, secondPos]) => text.substring(firstPos, secondPos));
  const parts = text.split(new RegExp(`(${textToHighlight.join('|')})`, 'gi'));
  return (
    <div>
      {
        parts.map((part, i) => {
          const hasMatch = textToHighlight.includes(part);
          const style = hasMatch ? { backgroundColor: '#ffc10766' } : {};
          return (
            <span key={i} style={style}>
              { part }
            </span>
          )
        })
      }
    </div>
  );
};