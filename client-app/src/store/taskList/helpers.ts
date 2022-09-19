import { Task } from '@generated/graphql';
import { v4 as uuidv4 } from 'uuid';
import { ChangeOrderItemType, TodoListItemType } from './types';
export const getUuidByArr = (arr: {_id: string}[]): string => {
  const id = uuidv4();
  if (arr.some(item => item._id === id))  return getUuidByArr(arr);
  else return id;
};

export const reorderItems = (_arr: Task[], reorderData: ChangeOrderItemType) => {
  const { index, id, itemState } = reorderData;
  
  const itemData = _arr.find(item => item._id === id);
  if (!itemData) return _arr;
  const arr = _arr.filter(item => item._id !== id && item.state !== itemState);
  let filteredArr = _arr.filter(item => item.state === itemState);
  if (filteredArr.length === 1 && itemState === itemData.state) return _arr;

  if (itemState === itemData.state) {
    const initialIndex = filteredArr.findIndex(item => item._id === id);
    const [removed] = filteredArr.splice(initialIndex, 1);
    filteredArr.splice(index, 0, removed);
  } else {
    if (filteredArr[index]) {
      const beforeArr = filteredArr.slice(0, index);
      const afterArr = filteredArr.slice(index, filteredArr.length);
      filteredArr = [
        ...beforeArr,
        {
          ...itemData,
          state: itemState
        },
        ...afterArr
      ];
    } else {
      filteredArr[index] = {
        ...itemData,
        state: itemState
      };
    }
  }

  return [ ...arr, ...filteredArr ];
};