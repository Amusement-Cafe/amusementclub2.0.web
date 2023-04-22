import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Countdown from 'react-countdown';

const CountdownItem = ({children, date, variant="body2"}) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <MDBox>
          {children}
        </MDBox>
      );
    } else {
      return (
        <MDTypography variant={variant}>
          {hours}h {minutes}m {seconds}s
        </MDTypography>
      );
    }
  };

  return <Countdown date={date} renderer={renderer} />
}

export default CountdownItem;
