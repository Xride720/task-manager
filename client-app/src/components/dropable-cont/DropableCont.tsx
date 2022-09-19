import React, { FC } from 'react';
import { DropableContProps } from './models';
import cl from './DropableCont.module.scss';
import { Droppable } from 'react-beautiful-dnd';

const DropableCont: FC<DropableContProps> = ({ id, getListStyle, children }) => {
  return (
    <Droppable droppableId={id}>
      {
        (provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {children}
            {provided.placeholder}
          </div>
        )
      }
      
    </Droppable>
  );
};

export { DropableCont };