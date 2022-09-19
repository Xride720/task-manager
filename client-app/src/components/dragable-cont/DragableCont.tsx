import React, { FC } from 'react';
import { DragableContProps } from './models';
import cl from './DragableCont.module.scss';
import { Draggable } from 'react-beautiful-dnd';

const DragableCont: FC<DragableContProps> = ({ getItemStyle, id, index, children }) => {
  return (
    <Draggable key={id || (Date.now() * Math.random() + String(index))} draggableId={id || (Date.now() * Math.random() + String(index))} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style || {}
            )}
          >
            {children && children(snapshot.isDragging)}
          </div>
        )}
        
    </Draggable>
  );
};

export { DragableCont };