import React, { useState }from 'react';
import moment from 'moment';
import CalendarMonth from './calendar-month/CalendarMonth';
import Button from './buttons/Button'
import H from './helper/CalendarHelper';
import styles from './Calendar.module.css';

const POSITIONS = ['left', 'center', 'right'];

export const WidthContext = React.createContext(500);

export default function({ height, transitionTime, width }) {

  const [selectedDate, setSelectedDate] = useState({
    selectedDate: moment()
  });

  const [position, setPosition] = useState('center');
  const [transition, setTransition] = useState(false);
  const [dateTable, setDateTable] = useState(moment());

  const helper = new H(dateTable);

  const selectDate = () => {
    console.log('we are selecting a date')
  }

  const goTo = (e, direction) => {
    e.preventDefault();
    let index = positionIndex();
    if (direction === 'left') index--;
    if (direction === 'right') index++;
    if (!!POSITIONS[index]) {
      setTransition(true);
      setPosition(direction);
      setTimeout(() => {
        setTransition(false);
        setPosition('center');
        if (direction === 'left') setDateTable(helper.getPreviousMonth(dateTable));
        if (direction === 'right') setDateTable(helper.getNextMonth(dateTable));
      }, transitionTime*1000);
    }
  }

  const positionIndex = () => {
    return POSITIONS.findIndex(pos => pos === position);
  }

  const calendarStyle = {
    width: (width*3) + 'px',
    left: -(positionIndex()*width) + 'px',
    'transition-duration': transition ? `${transitionTime}s` : '0s'
  }

  return (
    <WidthContext.Provider value={width}>
      <div style={{ height: height, width: width + 'px'}} className={styles.c_calendar__wrapper}>
        <div className={styles.c_boxes__buttons}>
          <Button display="<<" goTo={(e) => goTo(e, 'left')}/>
          <Button display=">>" goTo={(e) => goTo(e, 'right')}/>
        </div>
        <div style={calendarStyle} className={`${styles.c_calendar} ${styles.transition}`}>
          <CalendarMonth dateTable={helper.getPreviousMonth()} selectedDate={selectedDate} selectDate={selectDate} />
          <CalendarMonth dateTable={dateTable} selectedDate={selectedDate} selectDate={selectDate} />
          <CalendarMonth dateTable={helper.getNextMonth()} selectedDate={selectedDate} selectDate={selectDate} />
        </div>
      </div>
    </ WidthContext.Provider>
  );
}