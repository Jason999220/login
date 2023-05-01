# server install

1. express
2. nodemon
3. typescript @types/express ts-node --dev
4. passport
5. cors
6. dotenv
7. passport-google-oauth20
8. express-session
9. cookie-session
10. mongoose
11. @types/mongoose --dev
12. jwt
13. Joi
14. bcrypt

## TypeScript 初始化

"scripts": {
"dev": "ts-node index.ts"
},

## 處理 cors

1. 撰寫 cors 部分

## 註冊第三方登入

在各第三方登入的介面中註冊並取得 ID、SECRET，利用 passport 取得第三方登入的程式碼，令其能夠登入

## 處理使用者帳號進 DB

完成第三方登入登入後，在將資料存進 DB 中

### google developer

1. into google cloud console
2. login
3. into 控制台
4. into API 與服務
5. OAuth 同意畫面
6. 啟用 API => search google +
7. into 憑證 => 建立憑證 => OAuth 用戶端 ID

### github developer

1. login github
2. into settings
3. into Developer settings
4. into OAuth Apps
5. New OAuth App

### facebook developer

### line developer

##### "rootDir": "src"問題

會報錯 => File 'd:/Program/Side Project/login/server/user.ts' is not under 'rootDir' 'd:/Program/Side Project/login/server/src'. 'rootDir' is expected to contain all source files.

#### mongoDB 問題

MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.
