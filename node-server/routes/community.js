import express from "express";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

const BOARD = DB.models.board_content;
const ATTACH = DB.models.attach;

const router = express.Router();

const catList = [
  {
    code: "C1",
    eng: "general",
    kor: "일반",
    sub: [
      { eng: "notice", kor: "공지", code: "C1" },
      { eng: "free", kor: "자유게시판", code: "C1" },
    ],
  },
  {
    code: "C2",
    eng: "hobbies",
    kor: "취미",
    sub: [
      { eng: "animals", kor: "동물", code: "C2" },
      { eng: "plants", kor: "식물", code: "C2" },
    ],
  },
  {
    code: "C3",
    eng: "learning",
    kor: "학습",
    sub: [
      { eng: "programming", kor: "프로그래밍", code: "C3" },
      { eng: "modeling", kor: "모델링", code: "C3" },
    ],
  },
  {
    code: "C4",
    eng: "lifestyle",
    kor: "생활",
    sub: [
      { eng: "health", kor: "건강", code: "C4" },
      { eng: "fashion", kor: "패션", code: "C4" },
    ],
  },
  {
    code: "C5",
    eng: "issue",
    kor: "이슈",
    sub: [
      { eng: "politics", kor: "정치", code: "C5" },
      { eng: "entertainment", kor: "연예", code: "C5" },
    ],
  },
];

router.get("/all", async (req, res) => {
  try {
    // BOARD-ATTACH 관계 설정할 경우 에디터에 이미지를 등록할 때
    // 게시글보다 첨부파일이 먼저 등록되므로 INSERT 되지 않는 문제 발생
    let data = [];
    for (let cat of catList) {
      let items = {};
      items.code = `${cat.code}`;
      items.name = `${cat.kor}`;
      items.posts = await BOARD.findAll({
        where: { b_group: `${cat.code}` },
        limit: 5,
        subQuery: false,
        order: [["b_upvote", "DESC"]],
        raw: true,
        include: [
          {
            model: ATTACH,
            as: "attachs",
            attributes: [["a_save_name", "thumb"]],
            order: [["a_date", "DESC"]],
          },
        ],
        group: "b_code",
      });
      data.push(items);
    }

    console.log(data);
    return res.status(200).send({ catList, data });
  } catch (err) {
    console.error(err);
  }
});

// editor 에 이미지 업로드
// fileUp.single("...") : formData 객체에 file 을 append 했던 key 값으로 지정
// (key=value 로 저장되므로 input tag 의 name 과 동일한 역할)
// 파일을 여러 개 선택하더라도 별도로 요청하므로 single 로 받을 것
router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  console.log("file", req.file);
  // 게시글 uuid
  console.log("code", req.body.bcode);

  try {
    const file = req.file;
    const bcode = req.body.bcode;
    const uploadFileInfo = {
      a_code: v4(),
      b_code: bcode,
      a_original_name: file.originalname,
      a_save_name: file.filename,
      a_ext: file.mimetype,
    };
    await ATTACH.create(uploadFileInfo);

    return res.json({
      uploaded: true,
      url: uploadFileInfo.a_save_name,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/post/insert", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  try {
    await BOARD.create(data);

    return res.send({ MESSAGE: "POST INSERT" });
  } catch (err) {
    console.error(err);
  }
});

export default router;
