from pymodbus.client.sync import ModbusTcpClient, ConnectionException
import requests
import os
import pickle
import struct
import time
import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
import datetime as dt
import logging

# Set GPIO pin
button = 4        # button for reset
resetPin = 23     # LED for reset
ledRed = 17       # Get config error
ledGreen = 27     # Modbus error
ledBlue = 22      # Mqtt error

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(button, GPIO.IN)
GPIO.setup(resetPin, GPIO.OUT)
GPIO.setup(ledRed, GPIO.OUT)
GPIO.setup(ledGreen, GPIO.OUT)
GPIO.setup(ledBlue, GPIO.OUT)

# Set host server and path
HOST = 'http://dev.intcom.in.th:3000'     # set ip for fetch config
MQTTHOST = 'dev.intcom.in.th'   # set mqtt host
MQTTPORT = 1883 # set mqtt port
PATHCONFIG = os.path.dirname(os.path.realpath(__file__)) + '/config/config.p' # store local config in config.p
PATHLOG = os.path.dirname(os.path.realpath(__file__)) + '/log/modbus.log'

# Set logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Logging format
formatter = logging.Formatter('%(asctime)s : %(levelname)s : %(message)s')
fileFormatter = logging.FileHandler(PATHLOG)

# Apply format
fileFormatter.setFormatter(formatter)

logger.addHandler(fileFormatter)

# Default value for modbus
DEFAULT_VALUE = {
    'modbus_ip': '10.50.8.232',
    'Channels': [
        {'in_min': 2, 'channel': 0, 'out_max': 3, 'out_min': 4, 'in_max': 1},
        {'in_min': 3, 'channel': 1, 'out_max': 4, 'out_min': 5, 'in_max': 2},
        {'in_min': 2, 'channel': 2, 'out_max': 3, 'out_min': 4, 'in_max': 1}
    ]
}

# Get mac-address
def getMac(interface='eth0'):
    try:
        mac_address = open('/sys/class/net/%s/address' %interface).read()
    except:
        logger.error("Can't get mac-address from Raspberry Pi")
        mac_address = "00:00:00:00:00:00"
    finally:
        return mac_address[0:17]

# Fetch config from server
def getConfig():
    try:
        r = requests.get(HOST + '/config/' + getMac('eth0'), timeout=5)
        r.raise_for_status()
        data = r.json()

        dumpConfig(data)
        GPIO.output(ledRed, GPIO.LOW)

        return data
    except requests.exceptions.HTTPError as http:
        GPIO.output(ledRed, GPIO.HIGH)
        logger.warning("Can't connect to server: HTTPError")
        return loadConfig()
    except requests.exceptions.ConnectionError as connection:
        GPIO.output(ledRed, GPIO.HIGH)
        logger.warning("Can't connect to server: ConnectionError")
        return loadConfig()
    except requests.exceptions.RequestException as request:
        GPIO.output(ledRed, GPIO.HIGH)
        logger.warning("Can't connect to server: RequestException")
        return loadConfig()
    except requests.exceptions.Timeout as timeout:
        GPIO.output(ledRed, GPIO.HIGH)
        logger.warning("Can't connect to server: Timeout")
        return loadConfig()

# Save config to static file
def dumpConfig(config):
    pickle.dump(config, open(PATHCONFIG, 'wb'))

# Load config from static file
def loadConfig():
    return pickle.load(open(PATHCONFIG, 'rb'))

# Calculate value
def calculate(value, config):
    raw = (((config['out_max'] - config['out_min']) * (value - config['in_min'])) / (config['in_max'] - config['in_min'])) + config['out_min']
    return { config['channel']: raw }

# Get value from modbus
def getModbus(config):
    rawValue = []
    try:
        client = ModbusTcpClient(config['modbus_ip'])
        # address is -> {in_max: 1, in_min: 2, out_max: 1, out_min: 3}
        for address in config['Channels']:
            result = client.read_input_registers(address['channel'], 2)
            if result:
                raw = struct.pack('>HH', result.registers[1], result.registers[0])
                value = struct.unpack('>f', raw)[0]

                rawValue.append(calculate(value, address))

        client.close()
    except ConnectionException:
        GPIO.output(ledGreen, GPIO.HIGH)
        logger.critical('Error connect to modbus ip: {}'.format(config['modbus_ip']))
        return 'Error'
    else:
        GPIO.output(ledGreen, GPIO.LOW)
        return rawValue

# Reboot raspberry pi
def reboot():
    time.sleep(3)
    if GPIO.input(button) == 0:
        GPIO.output(resetPin, GPIO.HIGH)
        os.system("sudo rm " + PATHCONFIG)
        os.system('sudo shutdown -r now')

# Main
if __name__ == '__main__':
    dumpConfig(DEFAULT_VALUE)
    mqttc = mqtt.Client()

    try:
        mqttc.connect(MQTTHOST, MQTTPORT)
        logger.info("connect to mqtt server")
    except:
        logger.error("Can't connect to mqtt server via: " + str(MQTTHOST) + ":" + str(MQTTPORT))
        GPIO.output(ledBlue, GPIO.HIGH)

    while True:
        data = {}
        
        config = getConfig()
        modbusValue = getModbus(config)
        timenow = str(dt.datetime.utcnow())

        data['value'] = modbusValue
        data['time'] = timenow

        try:
            mqttc.publish(getMac('eth0'), str(data))
        except:
            logger.error("Can't send value via MQTT")
            logger.info(data)
            GPIO.output(ledBlue, GPIO.HIGH)
        else:
            GPIO.output(ledBlue, GPIO.LOW)

        if GPIO.input(button) == 0:
            logger.info('raspberry restart')
            reboot()

        time.sleep(3)
