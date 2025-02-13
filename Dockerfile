# 베이스 이미지
FROM node:18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# nodemon 설치 (개발 전용)
RUN npm install -g nodemon

# 소스 파일 복사
COPY . .

# 앱 실행
CMD ["npm", "run", "dev"]
