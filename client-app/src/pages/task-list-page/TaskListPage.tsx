import React, { FC, useRef, useState } from 'react';
import { observer } from 'mobx-react';

import { AddButton } from '@components/add-button';
import { DragableCont } from '@components/dragable-cont';
import { DropableCont } from '@components/dropable-cont';
import { EditModal } from '@components/edit-modal';
import { TaskColumn } from '@components/task-column';
import { TaskList } from '@components/task-list';
import { TaskListItem } from '@components/task-list-item';
import { Task, User } from '@generated/graphql';
import store from '@store';
import { NewTaskListItemType, TaskStateEnum } from '@store/taskList/types';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { getItemStyle, getListStyle, TaskStateArr } from './constants';
import { SortEnum, TodoListPageProps } from './models';
import { reorderItems, sortTask, fillNullUndefined } from './helpers';
import { TaskSubscription } from '@hocs/subscriptions/TaskSubscription';
import { useTaskControl } from '@hooks/useTaskControl';
import { useEditModal } from '@components/edit-modal/customHooks';

import cl from './TaskListPage.module.scss';
import { UserQuery, UserQueryChildrenPropsType } from '@hocs/queries/UserQuery';


const TaskListPage: FC<TodoListPageProps & UserQueryChildrenPropsType> = observer(({
  users,
  usersLoading,
  usersError
}) => {
  const [ items, setItems ] = useState<Task[]>([]);

  const {  
    deleteTask,
    updateTaskMany,
    createTask
  } = useTaskControl(items, setItems);

  const { modalProps } = store.TaskListStore.state;
  const { 
    setModalProps
  } = store.TaskListStore;

  const changeVisibleModalRef = useRef<((visible: boolean) => void) | null>(null);

  const { 
    modalData, 
    okTextModal, 
    onOkModal, 
    headerTextModal,
    modalItem 
  } = useEditModal(modalProps, users.filter(item => !!item) as User[]);


  const handleOpenNewItemModal = () => {
    setModalProps({
      okText: "Создать",
      headerText: "Создание задачи",
      onOk: (data: NewTaskListItemType) => {
        const newIndex = !items.length ?  0
          : (sortTask(items, SortEnum.DESC)[0]?.orderIndex || 0) + 1;
        createTask({
          ...data, 
          state: TaskStateEnum.Created, 
          orderIndex: newIndex
        });
        changeVisibleModalRef.current && changeVisibleModalRef.current(false);
      }
    });
    changeVisibleModalRef.current && changeVisibleModalRef.current(true);
  };

  const handleOpenEditItemModal = (id: string) => {
    const item = items?.find(_item => _item?._id === id);
    if (item) {
      setModalProps({
        okText: "Сохранить",
        headerText: "Редактрование Задачи",
        onOk: (data: Partial<Task>) => {
          const { __typename, ...reqData } = { ...item, ...data };
          updateTaskMany([{ 
            ...fillNullUndefined(reqData)
          }]);
          changeVisibleModalRef.current && changeVisibleModalRef.current(false);
        },
        ...item,
        
      });
      changeVisibleModalRef.current && changeVisibleModalRef.current(true);
    } else {
      console.debug(id, " todoListItem not found");
    }
    
  };

  const renderItem = function(item: Task, index: number) {
    return (
      <DragableCont 
        id={item._id!} 
        index={index} 
        getItemStyle={getItemStyle}
        key={item._id}
      >
        {
          (isDragging) => (
          <TaskListItem 
            {...item}
            deleteItem={deleteTask} 
            changeItem={handleOpenEditItemModal} 
            key={item._id}
            isDragging={isDragging}
          />
          )
        }
      </DragableCont>
    )
  };

  const onDragEnd = (result: DropResult) => {
    const itemId = result.draggableId;
    const itemState = result.destination?.droppableId as TaskStateEnum;
    const index = result.destination?.index || 0;
    const newArr = reorderItems(
      sortTask(items), 
      {
        id: itemId,
        itemState,
        index
      }
    );
    updateTaskMany(newArr.map(({ __typename, ...data }) =>  data._id === itemId ? {
      ...data,
      modifidedDate: new Date().toISOString()
    } : data));
    setItems(newArr);
  };

  return (
  <>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={cl.taskListPageCont} onMouseMove={(e) => e.preventDefault()}>
        <TaskSubscription 
          className={cl.columns} 
          setTasks={setItems}
        >
          {
            TaskStateArr.map((state, index) => (
                <TaskColumn taskState={state} key={index + "_column"}>
                  <DropableCont id={state} getListStyle={(isDargging: boolean) => getListStyle(isDargging, state)} key={index + "_column"}>
                    <TaskList<Task> 
                      items={
                        items.filter(item => item?.state === state)
                      }  
                      renderItem={renderItem}
                      customScroll={true}
                    />
                  </DropableCont>
                </TaskColumn>
            ))
          }
        </TaskSubscription>
        
        <AddButton 
          position="bottomRight"
          onClick={handleOpenNewItemModal}
        />
      </div>
    </DragDropContext>

    <EditModal
      changeVisible={changeVisibleModalRef}
      data={modalData}
      onOk={onOkModal}
      okText={okTextModal}
      headerText={headerTextModal}
      item={modalItem}
    />
  </>
  );
});

export default TaskListPage;