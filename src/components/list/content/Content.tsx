import styled from '@/styles/rightSideContent.module.scss';
import SearchContent from '@/components/list/content/SearchContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Content = () => {
  const { markers } = useSelector((state: RootState) => state.map);

  console.log(markers);

  return (
    <div className={styled.content}>
      {markers.map(
        (marker, index) =>
          marker.name && <SearchContent key={index} title={marker.name} />
      )}
    </div>
  );
};

export default Content;
