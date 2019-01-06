import client from './client';

const ChannelService = {
  add: (rpiId, data) => {
    const uri = `/channel/${rpiId}`;
    return client.post(uri, {
      channel: data.channel,
      in_max: data.in_max,
      in_min: data.in_min,
      out_max: data.out_max,
      out_min: data.out_min,
    });
  },
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

const FactoryService = {
  get: id => {
    const uri = `/factory/${id}`;
    return client.get(uri);
  },
  update: (id, data) => {
    const uri = `/factory/${id}`;
    return client.put(uri, {
      factory: data.factory,
      name: data.name,
      address: data.address,
      tel: data.tel,
    });
  },
};

export default client;

export { ChannelService, RpiService, FactoryService };
