import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Countdown from 'react-countdown';

const CountdownItem = ({children, date, variant="body2"}) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <MDBox>
          {children}
        </MDBox>
      );
    } else {
      return (
        <>
        {days > 0 && 
        <MDTypography variant={variant}>
          {days}d
        </MDTypography>}{" "}
        {(days > 0 || hours > 0) && 
        <MDTypography variant={variant}>
          {hours}h 
        </MDTypography>}{" "}
        <MDTypography variant={variant}>
          {minutes}m {seconds}s
        </MDTypography>
        </>
      );
    }
  };

  return <Countdown date={date} renderer={renderer} />
}

export default CountdownItem;
