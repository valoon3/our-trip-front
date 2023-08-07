import styled from '@/styles/rightSideContent.module.scss';
import { useCallback, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { HiChevronDoubleDown } from 'react-icons/hi';
import { SearchService } from '@/components/header/searchService';

type Props = {
  key: number;
  placeResult: google.maps.places.PlaceResult;
  userCheck: () => boolean;
};

const START_SIZE = '22';

const SearchContent = ({ placeResult, userCheck }: Props) => {
  const [bookMarkStar, setBookMarkStar] = useState(false);
  const searchService = new SearchService();

  const bookMarkStarHandler = useCallback(() => {
    if (!userCheck()) {
      return;
    }
    setBookMarkStar(!bookMarkStar);
  }, [bookMarkStar]);

  const detailOnClickHandler = useCallback(() => {
    if (typeof placeResult.place_id === 'string')
      searchService.findPlaceDetail(placeResult.place_id);
  }, []);

  return (
    <div className={styled.searchContent}>
      <div className={styled.sort}>
        <div style={{ cursor: 'pointer' }}>{placeResult.name}</div>
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
      </div>

      <hr />
      <div className={styled.sort}>
        {/*<div>내용</div>*/}
        {/*{placeResult.photos?.map((photo) => photo.html_attributions)}*/}
        <HiChevronDoubleDown
          onClick={detailOnClickHandler}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default SearchContent;
