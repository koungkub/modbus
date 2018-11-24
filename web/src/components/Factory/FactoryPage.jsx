import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import FactoryCard from './FactoryCard';
import RpiList from './RpiList';

const styles = () => ({
  clearfix: {
    marginBottom: 40,
  }
});

const factoryMock = {
  id: 1,
  factory: 'ccna',
  name: 'ชื่อโรงงาน',
  address: 'ที่อยู่โรงงาน',
  tel: '082-6666666',
  rpis: [
    {
      id: 1,
      mac_address: 'b8:27:eb:3e:b9:58',
      modbus_ip: '192.168.1.1',
      Channels: [
        {
          id: 1,
          channel: 0,
          in_max: 1,
          in_min: 2,
          out_max: 3,
          out_min: 4,
          status: true,
        },
        {
          id: 2,
          channel: 1,
          in_max: 1,
          in_min: 2,
          out_max: 3,
          out_min: 4,
          status: false,
        },
      ],
    },
    {
      id: 2,
      mac_address: 'b8:27:eb:3e:b9:58',
      modbus_ip: '192.168.1.1',
      Channels: [
        {
          id: 1,
          channel: 0,
          in_max: 1,
          in_min: 2,
          out_max: 3,
          out_min: 4,
          status: true,
        },
        {
          id: 2,
          channel: 1,
          in_max: 1,
          in_min: 2,
          out_max: 3,
          out_min: 4,
          status: false,
        },
      ],
    },
    {
      id: 2,
      mac_address: 'b8:27:eb:3e:b9:58',
      modbus_ip: '192.168.1.1',
      Channels: [
        {
          id: 1,
          channel: 0,
          in_max: 1,
          in_min: 2,
          out_max: 3,
          out_min: 4,
          status: true,
        },
        {
          id: 2,
          channel: 1,
          in_max: 1,
          in_min: 2,
          out_max: 3,
          out_min: 4,
          status: false,
        },
      ],
    },
    {
      id: 2,
      mac_address: 'b8:27:eb:3e:b9:58',
      modbus_ip: '192.168.1.1',
      Channels: [
        {
          id: 1,
          channel: 0,
          in_max: 1,
          in_min: 2,
          out_max: 3,
          out_min: 4,
          status: true,
        },
        {
          id: 2,
          channel: 1,
          in_max: 1,
          in_min: 2,
          out_max: 3,
          out_min: 4,
          status: false,
        },
      ],
    },
  ],
};

const FactoryPage = ({ factory = factoryMock, classes }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        โรงงาน {factory.id}
      </Typography>
      <FactoryCard factory={factory} />
      <Typography variant="h5" gutterBottom>
        Raspberry Pi ที่ถูกติดตั้งในโรงงาน
      </Typography>
      <RpiList rpis={factory.rpis} />
      <div className={classes.clearfix} />
    </div>
  )
}

export default withStyles(styles)(FactoryPage);
