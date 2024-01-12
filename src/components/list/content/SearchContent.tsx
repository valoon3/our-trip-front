import styled from '@/styles/rightSideContent.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { HiChevronDoubleDown } from 'react-icons/hi';
import { SearchService } from '@/components/header/searchService';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import SelectTripPlan from '@/components/popup/tripPlanPopup/selectTripPlan';

type Props = {
  key: number;
  // TODO: 보낼 때와 받을 때의 타입 형식 정의가 달라서 에러가 발생한다. 벡엔드에서 수정해야할듯
  placeResult: any;
  userCheck: () => boolean;
  contentType: string;
};

const START_SIZE = '22';

const SearchContent = ({ placeResult, userCheck, contentType }: Props) => {
  const [bookMarkStar, setBookMarkStar] = useState(false);
  const [selectTripPopupOpen, setSelectTripPopupOpen] =
    useState<boolean>(false);
  const searchService = new SearchService();
  const userToggle = useSelector((state: RootState) => state.user.loginToggle);

  const [planList, setPlanList] = useState<any[]>([]);

  const bookMarkStarHandler = useCallback(async () => {
    if (!userCheck()) {
      return alert('로그인 후 이용해주세요.');
    }

    bookMarkStar
      ? await axios.delete('/trip/bookmark/' + placeResult.place_id)
      : await axios.post('/trip/bookmark', {
          placeResult,
        });

    setBookMarkStar(!bookMarkStar);
  }, [bookMarkStar, userCheck, placeResult]);

  const detailOnClickHandler = useCallback(() => {
    if (typeof placeResult.place_id === 'string')
      searchService.findPlaceDetail(placeResult.place_id);
  }, []);

  const addPlanHandler = async () => {
    if (!userCheck()) {
      return alert('로그인 후 이용해주세요.');
    }

    await axios
      .get('/plan')
      .then((res) => {
        console.log(res.data);
        setPlanList(res.data);
        setSelectTripPopupOpen(true);
      })
      .catch((err) => console.error(err));
  };

  // TODO: 이거 수정하자
  useEffect(() => {
    if (contentType === 'search' && userToggle) {
      console.log('/trip/bookmark/' + placeResult.place_id);
      axios.get('/trip/bookmark/' + placeResult.place_id).then((res) => {
        setBookMarkStar(res.data);
      });
    }
  }, [userToggle, contentType, placeResult]);

  return (
    <div className={styled.searchContent}>
      <div className={styled.sort}>
        {bookMarkStar ? (
          <BsStarFill
            onClick={bookMarkStarHandler}
            size={START_SIZE}
            color="gold"
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <BsStar
            onClick={bookMarkStarHandler}
            size={START_SIZE}
            style={{ cursor: 'pointer' }}
          />
        )}
        <div style={{ cursor: 'pointer' }}>{placeResult.name}</div>
      </div>

      <hr />
      <div className={styled.sort}>
        {/*<div>내용</div>*/}
        {/*{placeResult.photos?.map((photo) => photo.html_attributions)}*/}
        <HiChevronDoubleDown
          onClick={detailOnClickHandler}
          style={{ cursor: 'pointer' }}
        />
        {contentType !== 'plan' && (
          <div>
            <div onClick={addPlanHandler} style={{ cursor: 'pointer' }}>
              일정 추가
            </div>
            <SelectTripPlan
              selectTripPopupOpen={selectTripPopupOpen}
              setSelectTripPopupOpen={setSelectTripPopupOpen}
              placeInfo={placeResult}
              planList={planList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContent;
