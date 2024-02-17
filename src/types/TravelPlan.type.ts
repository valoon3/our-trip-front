export interface PlaceI {
  address: string; // 주소
  business_status: string; // 영업 상태
  formatted_address: string; // 포맷된 주소
  geometry_lat: number; // 위도
  geometry_lng: number; // 경도
  icon: string; // 아이콘
  icon_background_color: string; // 아이콘 배경 색
  icon_mask_base_uri: string; // 아이콘 마스크 베이스 uri
  id: string; // 장소 id
  rating: number; // 평점
  types: string[]; // 장소 타입
  user_ratings_total: number; // 사용자 평점 총합
  time?: string; // 시간
  name: string; // 이름
}

export interface PlanDetailI {
  completed: boolean; // 완료 여부
  createdAt: Date; // 생성 날짜
  id: number; // id
  place: PlaceI; // 장소
  planDate: Date; // 계획 날짜
  priority: number; // 우선 순위
}

export interface TravelPlanI {
  title: string; // 여행 제목
  description?: string; // 간단한 설명
  startDate: Date; // 여행 시작 날짜
  endDate: Date; // 여행 시작 날짜
  createdAt?: Date | null; // 여행 시작 날짜
  updatedAt?: Date | null; // 여행 시작 날짜
  planDetail?: PlanDetailI[]; // 여행 계획
}
