import requests
import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime, timedelta


API_KEY = 'a411d702d383f7a96737f5e72009ad86'
API_STR = 'https://api.openweathermap.org/data/2.5/forecast?lat=%s&lon=%s&appid=%s'
CREATE_PARTITION = 'CREATE TABLE IF NOT EXISTS muller_travel.f_weather_%s PARTITION OF muller_travel.f_weather FOR ' \
                   'VALUES IN (\'%s\'); '

if __name__ == '__main__':

    alchemyEngine = create_engine('postgresql://wealook_user:22082105@34.159.134.154:5432/wealook_app')
    dbConnection = alchemyEngine.connect()
    df = pd.read_sql("select * from muller_travel.d_location", dbConnection)
    df.set_index('id', inplace=True)
    print(df.head())
    dbConnection.close()

    for idx, r in df.iterrows():
        print("INDEX >>>>> " + str(idx))
        lat = r.loc['lat']
        lng = r.loc['lng']
        API_CALL = API_STR % (lat, lng, API_KEY)
        print(API_CALL)
        response = requests.get(API_CALL)
        res_json = response.json()

        api_df = pd.DataFrame(res_json["list"])
        data = []
        for index, row in api_df.iterrows():
            main = row.loc['main']
            temp = main['temp']
            feels_like = main['feels_like']
            temp_min = main['temp_min']
            temp_max = main['temp_max']
            humidity = main['humidity']

            weather_cond_id = row.loc['weather'][0]['id']

            cloudiness = row.loc['clouds']['all']

            wind = row.loc['wind']
            wind_speed = wind['speed']
            wind_gust = wind['gust']

            rdatetime = row.loc['dt_txt'].split()
            rdate = rdatetime[0]
            dt = row.loc['dt']

            visibility = row.loc['visibility']

            res_dict = {
                'rdate': rdate,
                'dt': dt,
                'location_id': idx,
                'temp': temp,
                'feels_like': feels_like,
                'temp_min': temp_min,
                'temp_max': temp_max,
                'humidity': humidity,
                'weather_cond_id': weather_cond_id,
                'cloudiness': cloudiness,
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
