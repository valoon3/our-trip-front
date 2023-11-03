import styled from '@/styles/rightSideContent.module.scss';
import SearchContent from '@/components/list/content/SearchContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { setBookmarks, setPlans } from '@/app/reduce/contentSlice';
import Content from '@/components/list/content/content';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

type Props = {
  // contentType: string;
};

const ContentList = () => {
  const { markers } = useSelector((state: RootState) => state.map);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { contentType, bookmarks, plans } = useSelector(
    (state: RootState) => state.content
  );

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const toggleDataPicker = useCallback(() => {
    setShowDatePicker(!showDatePicker);
  }, [showDatePicker]);
  const [planTitle, setPlanTitle] = useState<string>('');
  const planTitleHandler = useCallback((e: any) => {
    setPlanTitle(e.target.value);
  }, []);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const submitOnClick = useCallback(async () => {
    const result = {
      title: planTitle,
      startPlanDate: startDate,
      endPlanDate: endDate,
    };
    const res = await axios.post('/plan', result);
  }, [planTitle, startDate, endDate]);

  const contents = useMemo(() => {
    if (contentType === 'bookmark') return bookmarks;
    else return plans;
  }, [bookmarks, contentType, plans]);

  const userLoginCheck = useCallback(() => {
    if (!user.loginToggle) {
      alert('로그인 후 이용해주세요.');
    }

    return user.loginToggle;
  }, [user]);

  // default contentType: bookmark

  useEffect(() => {
    if (contentType === 'bookmark') {
      axios.get('/trip/bookmarks').then((res) => {
        dispatch(setBookmarks(res.data));
      });
    } else if (contentType === 'plan') {
      // plan data 저장
      axios.get('/plan').then((res) => {
        if (res.data) {
          dispatch(setPlans(res.data));
        }
      });
    }
  }, [contentType]);

  // default contentType: search
  return contentType === 'search' ? (
    <div className={styled.contentList}>
      {markers.map((marker, index) => (
        <SearchContent
          key={index}
          placeResult={marker}
          userCheck={userLoginCheck}
          contentType={contentType}
        />
      ))}
    </div>
  ) : (
    <div className={styled.contentList}>
      {contentType === 'bookmark' ? (
        contents.map((bookmark, index) => (
          <Content key={index} placeResult={bookmark} />
        ))
      ) : contents.length === 0 ? (
        <div>
          <div>
            제목 선택 : <input type="text" onChange={planTitleHandler} />
            {planTitle}
            <h1>출발날짜와 도착날짜 선택</h1>
            <button onClick={toggleDataPicker} style={{ color: 'blue' }}>
              {showDatePicker ? '닫기' : '날짜 선택'}
            </button>
            {showDatePicker && (
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                locale="ko" // 한국어 로케일 사용
                dateFormat="yyyy-MM-dd"
                inline
              />
            )}
            <p>
              출발날짜:{' '}
              {startDate ? startDate.toDateString() : '날짜를 선택하세요'}{' '}
              <br />
              도착날짜: {endDate ? endDate.toDateString() : '날짜를 선택하세요'}
            </p>
          </div>
          <button onClick={submitOnClick}>제출</button>
        </div>
      ) : (
        <div>셀렉트 박스</div>
      )}
    </div>
  );
};

export default ContentList;
