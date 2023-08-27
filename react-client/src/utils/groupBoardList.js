export const groupBoardList = (data) => {
  return data.reduce((acc, obj) => {
    let key = obj["b_group_kor"];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

export default groupBoardList;
