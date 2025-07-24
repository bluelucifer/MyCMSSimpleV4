# 프로젝트 구조 설계

## 전체 아키텍처
```
MyCMSSimpleV4/
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── utils/         # 유틸리티 함수
│   │   └── styles/        # CSS 스타일
│   ├── public/
│   └── package.json
├── server/                 # Node.js 백엔드
│   ├── src/
│   │   ├── routes/        # API 라우트
│   │   ├── services/      # 비즈니스 로직
│   │   └── utils/         # 유틸리티 함수
│   ├── data/              # 파일 기반 데이터 저장소
│   └── package.json
├── docs/                   # 프로젝트 문서
├── dist/                   # 빌드된 정적 파일 (GitHub Pages용)
└── README.md
```

설계 문서를 작성했습니다. 이제 이 설계에 대한 응답을 기다리겠습니다.

## 기술 스택 상세
- **프론트엔드**: React 18 + TypeScript
- **에디터**: Quill.js (무료 WYSIWYG 에디터)
- **백엔드**: Express.js + Node.js
- **파일 관리**: JSON 파일로 문서 저장
- **빌드 도구**: Vite (빠른 개발 환경)
- **패키지 매니저**: pnpm (메모리에 따르면 선호)

## 주요 기능 구현 계획

### 1. 문서 에디터
- **WYSIWYG 에디터**: Quill.js 사용 (무료, API 키 불필요)
- **실시간 미리보기**: 작성 중인 내용을 실시간으로 확인
- **자동 저장**: 일정 시간마다 자동으로 저장

### 2. 문서 관리
- **문서 목록**: 저장된 모든 문서의 목록 표시
- **문서 검색**: 제목으로 문서 검색 기능
- **문서 삭제**: 불필요한 문서 삭제 기능

### 3. 파일 저장 시스템
- **JSON 형식**: 각 문서를 JSON 파일로 저장
- **메타데이터**: 제목, 생성일, 수정일 등 포함
- **파일 구조**: `data/` 폴더에 문서별 JSON 파일 저장

### 4. HTML 변환 및 배포
- **HTML 생성**: Quill.js 에디터 내용을 정적 HTML로 변환
- **GitHub Pages**: 빌드된 HTML 파일을 GitHub Pages로 배포
- **미리보기**: 배포 전 로컬에서 미리보기 기능

## API 설계

### 문서 관리 API
- `GET /api/documents` - 문서 목록 조회
- `GET /api/documents/:id` - 특정 문서 조회
- `POST /api/documents` - 새 문서 생성
- `PUT /api/documents/:id` - 문서 수정
- `DELETE /api/documents/:id` - 문서 삭제

### 파일 관리 API
- `POST /api/export/html/:id` - HTML 파일로 내보내기
- `GET /api/preview/:id` - 문서 미리보기

## 컴포넌트 구조

### 프론트엔드 컴포넌트
- **App**: 메인 애플리케이션 컴포넌트
- **DocumentList**: 문서 목록 페이지
- **DocumentEditor**: 문서 편집 페이지
- **PreviewModal**: 미리보기 모달
- **Header**: 네비게이션 헤더

### 백엔드 서비스
- **DocumentService**: 문서 CRUD 로직
- **FileService**: 파일 시스템 관리
- **ExportService**: HTML 변환 및 내보내기

## 데이터 구조

### 문서 JSON 구조
```json
{
  "id": "문서 고유 ID",
  "title": "문서 제목",
  "content": "Quill.js 에디터 내용 (HTML)",
  "createdAt": "생성일시",
  "updatedAt": "수정일시"
}
```

## 개발 환경 설정

### 필요한 패키지
- **프론트엔드**: React, TypeScript, Vite, Quill.js, Axios
- **백엔드**: Express, CORS, Multer, Marked, Cheerio
- **개발 도구**: Nodemon, Concurrently

### 환경 변수
- `PORT`: 서버 포트 (기본값: 3001)
- API 키 불필요 (Quill.js는 무료)

## 배포 계획

### 개발 환경
- 로컬에서 프론트엔드와 백엔드 동시 실행
- Hot reload 지원으로 빠른 개발

### 프로덕션 배포
- 정적 파일 생성 (HTML, CSS, JS)
- GitHub Pages에 배포
- 백엔드는 로컬에서만 실행 (파일 기반이므로)

## 보안 고려사항
- CORS 설정으로 로컬 개발 환경 허용
- 파일 업로드 크기 제한
- 입력 데이터 검증

## 성능 최적화
- 파일 기반 저장으로 빠른 접근
- 이미지 최적화
- 코드 스플리팅으로 초기 로딩 시간 단축

## 에디터 선택 이유
- **Quill.js**: 무료, API 키 불필요, 가벼움, 커스터마이징 용이
- **TinyMCE**: 유료 API 키 필요, 기능이 많지만 복잡함
- **기타 대안**: Draft.js, Slate.js (더 복잡한 기능 필요시)