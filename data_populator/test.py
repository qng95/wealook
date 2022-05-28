import pandas as pd
import json
from sqlalchemy import create_engine
from datetime import datetime, timedelta

CREATE_PARTITION = 'CREATE TABLE IF NOT EXISTS muller_travel.f_weather_%s PARTITION OF muller_travel.f_weather FOR ' \
                   'VALUES IN (\'%s\'); '

if __name__ == '__main__':

    data = json.load(open(r'C:\Users\trann\PycharmProjects\countries\test.json'))

    df = pd.DataFrame(data["list"])
    data = []
    for idx, r in df.iterrows():
        main = r.loc['main']
        temp = main['temp']
        feels_like = main['feels_like']
        temp_min = main['temp_min']
        temp_max = main['temp_max']
        humidity = main['humidity']

        weather_cond_id = r.loc['weather'][0]['id']

        cloudiness = r.loc['clouds']['all']

        wind = r.loc['wind']
        wind_speed = wind['speed']
        wind_gust = wind['gust']

        rdatetime = r.loc['dt_txt'].split()
        rdate = rdatetime[0]
        dt = r.loc['dt']

        visibility = r.loc['visibility']

        res_dict = {
            'rdate': rdate,
            'dt': dt,
            'location_id': 1392685764,
            'temp': temp,
            'feels_like': feels_like,
            'temp_min': temp_min,
            'temp_max': temp_max,
            'humidity': humidity,
            'weather_cond_id':  weather_cond_id,
            'cloudiness':  cloudiness,
            'wind_speed': wind_speed,
            'wind_gust': wind_gust,
            'visibility': visibility
        }

        data.append(res_dict)

    res_dt = pd.DataFrame(data)
    engine = create_engine('postgresql://wealook_user:22082105@34.159.134.154:5432/wealook_app')
    # PREPARE DATE FOR PARTITION
    t0 = datetime.today()
    t1 = t0 + timedelta(days=1)
    t2 = t0 + timedelta(days=2)
    t3 = t0 + timedelta(days=3)
    t4 = t0 + timedelta(days=4)
    t5 = t0 + timedelta(days=5)

    engine.execute(CREATE_PARTITION % (t0.strftime('%Y_%m_%d'), t0.strftime('%Y_%m_%d')) +
                   CREATE_PARTITION % (t1.strftime('%Y_%m_%d'), t1.strftime('%Y_%m_%d')) +
                   CREATE_PARTITION % (t2.strftime('%Y_%m_%d'), t2.strftime('%Y_%m_%d')) +
                   CREATE_PARTITION % (t3.strftime('%Y_%m_%d'), t3.strftime('%Y_%m_%d')) +
                   CREATE_PARTITION % (t4.strftime('%Y_%m_%d'), t4.strftime('%Y_%m_%d')) +
                   CREATE_PARTITION % (t5.strftime('%Y_%m_%d'), t5.strftime('%Y_%m_%d')))

    res_dt.to_sql('f_weather', engine, schema='muller_travel', if_exists="append")
