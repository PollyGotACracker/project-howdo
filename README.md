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

![post](https://github.com/PollyGotACracker/team-project-howdo/assets/92136750/bf0f57b5-f3d5-4b98-8523-ae4576f13f3e)
![order-filter](https://github.com/PollyGotACracker/team-project-howdo/assets/92136750/7710595b-6a8f-4fcf-a1d2-7fb4fafa2ca8)

## Design

### Fonts

- 강원튼튼체

### Colors

- ![#0673ff](https://placehold.co/15x15/0673ff/0673ff.png) `#0673ff`
- ![#aae91e](https://placehold.co/15x15/aae91e/aae91e.png) `#aae91e`
