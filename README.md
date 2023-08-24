# Project HowDo

## 실행 방법

1. git bash 에서 다음 명령어 실행

```bash
git clone https://github.com/PollyGotACracker/team-project-howdo.git
```

2. 데이터베이스 설정:

- mySQL Workbench 실행
- root 의 `config` 폴더에서 `db_config_sample.js` 파일을 `db_config.js` 파일로 복사 후  
  workbench 설정에 맞게 `username`, `password`, `host` 수정
- 데이터베이스 생성을 위해 다음 명령어 실행

```sql
CREATE DATABASE HowDo;
```

3. IDE 프로그램에서 프로젝트 열기
4. root 와 `react-client` 의 `config` 폴더에서  
   각각 `kakao_config_sample.js` 파일을 `kakao_config.js` 파일로 복사 후 카카오 API키 작성
5. 프로젝트를 열고 터미널에서 다음 명령어 실행

```bash
npm install
npm start
```

6. `react-client` 폴더에서 터미널을 열고 다음 명령어 실행

```bash
npm install
# window
npm run window
# mac
npm run mac
# linux
npm run linux
```

## 실행 화면(커뮤니티)

![post](https://file.notion.so/f/s/fcdc4b02-141d-467d-97d5-2888d9416d52/post.gif?id=3b5ccb69-2180-4886-8ed0-6ba478d668c3&table=block&spaceId=f0e0ab15-e9ec-46c4-97fe-8808a1f369e6&expirationTimestamp=1692979200000&signature=VY9S79feOE92rvJt7av-FzprnEsg1n92uKuVw76v2_M&downloadName=post.gif)
![order-filter](https://file.notion.so/f/s/94214c24-b59f-4103-ac6e-9d4838197af4/order-filter.gif?id=d66e6d77-02f4-4838-a563-e59f02fce756&table=block&spaceId=f0e0ab15-e9ec-46c4-97fe-8808a1f369e6&expirationTimestamp=1692979200000&signature=W2YFYhZ6Xmq7q5kborHEs_Jd_4jcBMTuI5ZA8JVmJi0&downloadName=order-filter.gif)

## Design

### Fonts

- 강원튼튼체

### Colors

- ![#0673ff](https://placehold.co/15x15/0673ff/0673ff.png) `#0673ff`
- ![#aae91e](https://placehold.co/15x15/aae91e/aae91e.png) `#aae91e`
