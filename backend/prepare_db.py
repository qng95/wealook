import os
import pandas as pd
from functools import cache
import sqlalchemy
from backend.environment_settings import ENV_CONFIG

# TODO: this script is only helper script for now.
# TODO: It should be deprecate in the future as we should rely only on migration of Django and preset data should be imported through admin page

_BASE_DIR = os.path.abspath(os.path.dirname(__file__))
_CONFIG_DIR = os.path.join(_BASE_DIR, "")
_WORLD_CITIES_CSV = "worldcities.csv"

_DATABASE = ENV_CONFIG.DATABASES


def get_dbms():
    # TODO: detect DBMS from _DATABASE.DATABASES
    return "postgresql"


def get_db_settings(field):
    field = field.upper()
    return _DATABASE['default'][field]


def get_connection_string():
    dbms = get_dbms()
    if dbms == "postgresql":
        user = get_db_settings(field="USER")
        pwd = get_db_settings(field="PASSWORD")
        host = get_db_settings(field="HOST")
        port = get_db_settings(field="PORT")
        name = get_db_settings(field="NAME")
        return f"postgresql://{user}:{pwd}@{host}:{port}/{name}"


@cache
def get_db_engine():
    return sqlalchemy.create_engine(get_connection_string(), echo=True)


def create_populate_d_location():
    print(f"Creating and populating d_location table with data from ./{_WORLD_CITIES_CSV}....")
    cities_df = pd.read_csv(os.path.join(_CONFIG_DIR, _WORLD_CITIES_CSV))
    # TODO: whitelabel schema support
    cities_df.to_sql('d_location', get_db_engine(), schema='muller_travel')
    print("DONE with d_location table")


def check_create_f_weather():
    print(f"Checking and creating f_weather table if not exist...")
    sql_file = f"f_weather_{get_dbms()}.sql"
    print(f"Executing commands from {sql_file}...")
    with open(f"""{os.path.join(_CONFIG_DIR, sql_file)}""", 'r') as sqlfile:
        escaped_sql = sqlalchemy.text(sqlfile.read())
        with get_db_engine().connect() as con:
            con.execute(escaped_sql)
    print("DONE with f_weather table")


def main():
    print("Going to check/create/populate the the following table with pre-configured data")
    print("  * d_location: all available cities")
    print("  * f_weather: table for storing weather data")
    create_populate_d_location()
    check_create_f_weather()
    print("DONE!")


if __name__ == "__main__":
    main()
