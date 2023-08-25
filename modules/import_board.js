import DB from "../models/index.js";
import data from "../data/board.json" assert { type: "json" };

const BOARD = DB.models.board;

export const importBoard = async () => {
  for (let item of data.board) {
    try {
      console.log("create board", item);
      await BOARD.create(item);
    } catch (err) {
      console.log("update board", item);
      await BOARD.update(item, { where: { b_code: item.b_code } });
    }
  }
};
