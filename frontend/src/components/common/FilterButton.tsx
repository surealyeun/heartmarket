import React, { useState, useEffect } from 'react';
import './FilterButton.scss';
import { useDispatch, useSelector } from 'react-redux';
import { filterType } from '../../modules/postFilter';
import { diffBy } from '../../modules/postPage';
import { RootState } from '../../modules';

interface Filter {
  id: number;
  title: string;
}

function FilterButton(props: Filter) {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const { id } = props;
  const filterNum = useSelector(({ postFilter }: RootState) => postFilter.num);
  useEffect(() => {
    if (id === filterNum) setToggle(!toggle);
    return () => {
      setToggle(true);
    };
  }, [filterNum]);
  const onClick = (e: any) => {
    console.log('click');
    dispatch(filterType(id));
    dispatch(diffBy(0));
  };
  return (
    // <div>
    <button
      onClick={onClick}
      className={
        toggle
          ? 'FilterButton_btn FilterButton_btn_base'
          : 'FilterButton_btn FilterButton_btn_base2'
      }
    >
      {props.title}
    </button>
    // </div>
  );
}

export default FilterButton;
