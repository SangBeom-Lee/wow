//환경변수 로딩
require('dotenv').config();

const express           = require('express');                       //Express
const cookieParser      = require('cookie-parser');                 //cookie
const cors              = require('cors');                          //cors
const blizzardRoutes    = require('./routes/blizzardRoutes');       //routes
const errorHandler      = require('./middlewares/errorHandler');    //middleware
const path              = require('path');

const app               = express();

//쿠키
app.use(cookieParser());

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 라우트 설정
app.use('/', blizzardRoutes);

// 에러 처리 미들웨어
app.use(errorHandler);

// 뷰 템플릿 엔진
app.set('views', "./views");
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
