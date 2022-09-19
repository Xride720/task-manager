import { Task } from "@generated/graphql";
import { ChangeOrderItemType } from "@store/taskList/types";
import { SortEnum } from "./models";

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

  return [ ...arr, ...filteredArr.map((item, i) => ({
    ...item,
    orderIndex: i
  })) ];
};

export const sortTask = (arr: Task[], type : SortEnum = SortEnum.ASC ) => {
  if (type === SortEnum.ASC)
    return arr.slice().sort((a, b) => (a.orderIndex || 0) > (b.orderIndex || 0) ? 1 : -1);
  else 
    return arr.slice().sort((a, b) => (a.orderIndex || 0) > (b.orderIndex || 0) ? -1 : 1);
};

export const fillNullUndefined = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((acc: Record<string, any>, [key, value]) => {
    acc[key] = value || null;
    return acc;
  }, {});
}