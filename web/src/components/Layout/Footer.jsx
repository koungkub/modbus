import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    backgroundColor: '#fff',
    textAlign: 'center',
    width: '100%',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    padding: '30px 0 20px 0',
  },
})

const Footer = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="body1" gutterBottom>
      สำนักงานมาตรฐานผลิตภัณฑ์อุตสาหกรรม (สมอ.) กระทรวงอุตสาหกรรม เลขที่ 75/42 ถนนพระรามที่ 6 เขตราชเทวี กรุงเทพฯ 10400 <br />
      โทรศัพท์ : 0-2202-3300 อีเมล : tisiwebmaster@tisi.go.th <br />
      ศูนย์บริการ NSW โทรศัพท์ : 0-2354-3266 , 0-2354-3267 อีเมล :nsw@tisi.go.th <br />
      © สงวนสิทธิ์ พ.ศ.2558 ตามพระราชบัญญัติลิขสิทธิ์ 2537 สำนักงานมาตรฐานผลิตภัณฑ์อุตสาหกรรม (สมอ.)
    </Typography>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Footer);
