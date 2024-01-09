export interface TravelPlanI {
  title: string; // 여행 제목
  description?: string; // 간단한 설명
  startDate: Date; // 여행 시작 날짜
  endDate: Date; // 여행 시작 날짜
  createdAt?: Date | null; // 여행 시작 날짜
  updatedAt?: Date | null; // 여행 시작 날짜
}
