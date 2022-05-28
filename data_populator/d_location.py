import pandas as pd
from sqlalchemy import create_engine
import psycopg2

if __name__ == '__main__':
    df = pd.read_csv(r'C:\Users\trann\PycharmProjects\countries\worldcities.csv')
    print(df.head())

    engine = create_engine('postgresql://wealook_user:22082105@34.159.134.154:5432/wealook_app')
    df.to_sql('d_location', engine, schema='muller_travel')
