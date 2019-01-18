def getMac(interface='eth0'):
    try:
        mac_address = open('/sys/class/net/%s/address' %interface).read()
    except:
        logger.error("Can't get mac-address from Raspberry Pi")
        mac_address = "00:00:00:00:00:00"
    finally:
        return mac_address[0:17]

print(getMac())
