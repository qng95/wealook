CREATE TABLE IF NOT EXISTS muller_travel.f_weather
(
    index bigint,
    rdate date,
    dt bigint,
    location_id bigint,
    temp double precision,
    feels_like double precision,
    temp_min double precision,
    temp_max double precision,
    humidity bigint,
    weather_cond_id bigint,
    cloudiness bigint,
    wind_speed double precision,
    wind_gust double precision,
    visibility bigint
) PARTITION BY LIST (rdate);

ALTER TABLE IF EXISTS muller_travel.f_weather
    OWNER to wealook_user;

CREATE INDEX IF NOT EXISTS ix_muller_travel_f_weather_dt
    ON muller_travel.f_weather USING btree
    (dt ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS ix_muller_travel_f_weather_location
    ON muller_travel.f_weather USING btree
    (location_id ASC NULLS LAST);