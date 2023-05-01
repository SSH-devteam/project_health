# Node 에서 기본으로 만들어 놓은 Image 사용
# alpine : 최소단위만 사용
FROM node:18

# Linux 에 폴더 생성
RUN mkdir -p /app

# 실행 위치 설정
WORKDIR  /app

# package.json 과 package-lock.json 을 현재 경로로 불러옴
# COPY package.json package-lock.json ./

# COPY source dest  
# 현재 소스에서 현재 디렉토리에 카피하겠다 == copy . .
COPY . .

# run instructions 
# ci : package-lock json에 명시돼 있는 버전으로 다운로드를 진행
RUN npm ci
RUN npm run build
# main.ts에 나와 있음
EXPOSE 3000
CMD ["node","dist/main.js"]

# Layer 단위로 실행되기 때문에
# 가장 실행 안 되는 것을 맨 위에 적어주는 것이 좋음