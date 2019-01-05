import client from './client';

const headers = { 'Content-Type': 'application/json' };

const ChannelService = {
  update: data => {
    const uri = `/channel/${data.id}`;
    return client.put(uri, {
      channel: data.channel,
      in_max: data.in_max,
      in_min: data.in_min,
      out_max: data.out_max,
      out_min: data.out_min,
    });
  },
};

const RpiService = {
  update: data => {
    const uri = `/factory/${data.factory_id}/rpi/${data.id}`;
    return client.put(uri, {
      modbus_ip: data.modbus_ip,
      mac_address: data.mac_address,
    });
  },
};

export default client;

export { ChannelService, RpiService };
