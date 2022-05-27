# Wealook (Weather Look)

Is an platform where user can check the weather condition of locations around the world.

## User Stories
#### As a user, I want to...
* see **current** weather condition of my "home" city.
* set a city as my "home" city 
* see **current** weather condition of the city I chose.
* see the **5 days forecast** of my "home" city.
* see the **5 days forecast** of the city I chose.
* see the current weather condition of multiple cities which I chose.
* see the 5 days forecast weather condition of multiple cities which I chose.

#### As a travel agency, I want to present my customers...
* current weather condition of a collection of cities that I created before hand.
* 5 days forecast weather condition of a collection of cities that I created before hand.
* a table of cities collections that match my customer's preferences.
* create a collection of cities match my customer's needs.

(Note: beside the specific use cases, a travel agency also have all the use cased like a normal user)

## Design

* The app should be design around a concept of **filters**.
* A filter is the user's preferences for criterias to build up the list of cities.
* A filter can include the following criterias:
    * Lists of prefer regions and cities
    * Temperature range
    * Weather condition like Rainy, Cloudy, Sunny, Stormy.
* User then have a collection of those filters with naming.

### Criteria:
* The application should be SaaS and don't provide on-premise option
* White labeling for integration with different travel agency
* Support OAuth2

### Use cases:
* Get user current "home" location base on IP / Location Service
* Store user "home" location
* Get current weather condition of city X
* Get midday 5 days forecast weather condition of city X
* Get list of all user's filters
* Delete a user filter
* Create a user filter
* Update a user filter
* Get details of user's filter F
* Get current weather condition of cities base on user's filter F
* Get 5 days forecast weather condition of cities base on user's filter F

### Resources \& Models 
#### Table: d_location
* id 
* city 
* country 
* capital
#### Table: f_user_preference (GPDR compliance -> only userId should be preferenced)
* id
* user_id
* home_location_id
#### Table: f_filter
* id
* filter_name
* user_id
* temp_from
* temp_to
* weather_cond
#### Table: f_weather
* location_id (index by this)
* repoch (received dt - UTC)
* temp
* temp_min
* temp_max
* feels_like
* humidity
* wcond_id
* cloudiness
* wind_speed
* wind_gust
* visibility
* rainvol_3h
* snowvol_3h
* rdate (YYYY-MM-DD, partition by this)

#### Define
* f_:
  * Fact table: changed/updated base on user's action
* d_:
  * Dimension table: more or less static data, changed/updated occasionally.

![dataTable](dataTables.png)

### Rest API 
- /api/v1 (versioning)
    - /userpref/:userid
      - GET: get user preference
        - Example return:
          ```
          { 
            result: <HTTP_CODE>,
            message: "successful",
            data: {
              user_id: "userid1",
              home_location_id: "locationid_01"
            }
          }
          ```
      - PUT: update user preference
        - Example payload:
          ```
          {
            user_id: "userid1", 
            home_location_id: "locationid_02"
          }
          ```
        - Example return:
          ```
          {
            result: <HTTP_CODE>, 
            message: "successful"
          }
          ```
    - /filters/:userid
      - GET: get all user's filters -> return list of :filterid
        - Example return:
          ```
          { 
            result: <HTTP_CODE>, 
            message: "successful", 
            data: {
              filters: [
                "filterid_01", "filterid_02"
              ]
            }
          }
          ```
      - POST: create new filters    -> return new :filterid
        - Example payload:
          ```
          {
            filter_id: "", 
            filter_name: "Rainy cities in Europe"
          }
          ```
        - Example return:
          ```
          {
            result: <HTTP_CODE>, 
            message: "successful", 
            data: {
              filterid: "filterid_new"
            }
          }
          ```
    - /filters/:userid/:filterid 
      - GET: get filter's detail (:filterid)
        - Example return:
          ```
          { 
            result: <HTTP_CODE>,
            message: "successful",
            data: {
              filter_id: "newfilter_id01",
              filter_name: "Rainy cities in Europe",
              temp_from: "25",
              temp_to: "35",
              weather_cond: "rainy",
            }
          }
          ```
      - PUT: update filter's detail
        - Example payload:
          ```
          { 
            filter_id: "newfilter_id01", 
            filter_name: "Rainy cities in Europe", 
            temp_from: "35", 
            temp_to: "45", 
            weather_cond: "rainy", 
          }
        - Example return:
          ```
          {
            result: <HTTP_CODE>, 
            message: "successful",
          }
          ```
    - /cities                   
      - GET: get all cities -> list of all
        - Example return:
          ```
          {
            result: <HTTP_CODE>, 
            message: "successful", 
            data: { 
              cities: [ 
                { 
                  id: "", 
                  city: "", 
                  country: "", 
                  capital: "", 
                } 
              ] 
             } 
          }
          ``` 
    - /weather/s/:locationid       
      - GET: get 5 day forecast weather for location (:locationid)
        - Example return:
          ```
          {
            result: <HTTP_CODE>, 
            message: "successful", 
            data: { 
                weather: [ 
                  { 
                    location_id: "",
                    repoch: "",
                    temp: "",
                    feels_like: "",
                    temp_min: "", 
                    temp_max: "", 
                    humidity: "", 
                    wcond_id: "", 
                    cloudiness: "", 
                    wind_speed: "", 
                    wind_gust: "", 
                    visibility: "", 
                    rainvol_3h: "", 
                    snowvol_3h: "", 
                    rdate: "", 
                  } 
                ] 
            }
          }
          ```
    - /weather/m/:filterid         
      - GET: get 5 day forecast weather for all cities by filter (:filterid)
        - Example return:
          ```
          {
            result: <HTTP_CODE>, 
            message: "successful", 
            data: { 
              cities: [ 
                { 
                  location_id: "", 
                  city: "", 
                  country: "", 
                  capital: "", 
                } 
              ], 
              weather: [ 
                   { 
                     location_id: "", 
                     repoch: "", 
                     temp: "", 
                     feels_like: "", 
                     temp_min: "", 
                     temp_max: "", 
                     humidity: "", 
                     wcond_id: "", 
                     cloudiness: "", 
                     wind_speed: "", 
                     wind_gust: "", 
                     visibility: "", 
                     rainvol_3h: "", 
                     snowvol_3h: "", 
                     rdate: "", 
                   } 
              ]
            } 
          }
          ``` 

### UI

#### Tech-Stack
* Webapp (HTML / JS / CSS)
* React
* React-Router
* Material-UI
* Redux

#### Wireframe

##### Pages
* Home
  ![homePageWireFrame.png](homePageWireFrame.png)
* FilterCollection
  ![filtersPageWirefame.png](filtersPageWirefame.png)
  * Filter
  ![filteredPage.png](filteredPage.png)

##### Usage Flow
* At beginning:
  * landing on **Home** page.
* At **Home** Page:
  * The weather condition for selected/home location for next 5 days will be shown on each **WeatherCard**.
  * User search for city they want to see the weather on **AutoCompletionSearch**.
  * User press **LocationButton** to set back to their current location.
  * User press **CollectionButton** to navigate to **FilterCollection** page.
* At **FilterCollection** Page:
  * All filters belong to the user will be shown as **FilterCard** on **FilterCardGrid**
  * User press **HomeButton** to navigate back to **Home** page.
  * User search for filter by name on **AutoCompletionSearch**.
  * User press **AddFilterBtn** to add new filter, this will navigate User to the **Filter** page of that new filter.
  * User press **FilterCard** to navigate to **Filter** page of that filter.
  * User press **DeleteFilterBtn** on **FilterCard** to delete a filter from the their filter collection.
* At **Filter** Page:
  * Only city that match the criteria of the filter will be shown on **FilteredCityCardGrid**
  * User press **CollectionButton** to go back to **FilterCollection** page
  * User press **SaveButton** to save the current filter criterias.
  * user press **ResetButton** to reset the filter criteria to last saved state.
  * User press **ClearAllButton** to clear all criteria.
  * User enter city/region in the **CityRegionAutoCompletionSearch** to search and add city/region to the filter.
  * User press **ConditionSwitch** to turn on/off search criteria for weather condition (E.g: filter Sunny or Rainy cities only).
  * User slide on **TemperatureSlider** to select the temperature range to filter cities.
  * Selected cities and regions will be present as a small chip in **SelectedCityRegionList**
  * User click the "X" icon on **SelectedCityRegionChip** to clear the city/region from the filter.

### UI-Components \& Re-usability
* Label (cross platform)
* DeletableChip (cross platform)
* ChipList (cross platform)
* Card
  * WeatherCard (cross platform)
  * FilterCard (cross platform)
* CardGrid (cross platform)
* Switch (cross platform)
* StepRangeSlider (cross platform)
* Button
  * IconButton (cross platform)
* Bar
  * NavBar (cross platform)
    * ButtonLeft
      * AutoCompletionSearchField
      * ButtonRight
  * FilterBar
    * FilterSideBar (web browser only)

### Backend

##### Tech-Stack
* Python 3.10
* Django
* Django Rest Framework

##### Components
* WeatherApiPort (Interface) -> define method for interacting with weather api
  * OpenWeatherApiAdapater (Implementation) -> implementation for calling openweather api
* Repository (ORM and auto wired by Django)
  * Models
* RepoCache
  * CacheWithTimeout -> data will be invalidate after 1h/3h and new DB query is needed.
* Services
  * DomainService -> abstraction from the implementation of the Repository and Cache)
    * WeatherService
      * get weather of a city
      * get weather of a collection of cities
    * LocationService
      * get detail of a city (city name, country, region)
      * get a collection of cities base on countries, regions, and also cities
  * ApplicationService -> aggregated services that tranform filter data before handling out to client side.
    * WeatherFilterService
      * get weather of a city
      * get weather of a list of cities
      * get weather of all cities of a county
      * get weather of all cities of a region
      * filter weather base on criteria (temp range, weather condition)
* RestController -> receive input and validation
  * handle rest request and delegate to corresponding ApplicationService

### Database
* DBMS: PostgreSQL 14 (Google Cloud Platform Managed SQL)


## Scale in future

#### In comparison: 
* AirBnB have 100.000 locations available on website.
* MSN Weather have hourly forecast for the next 16 day.

#### Back-end solution:
* weather data should be consider as time-series and should be stored in proper time-series database.
* change command from RestController will fire an event, then Repository will action on that event to update DB.
* weather api adapater is call periodically to get weather data and fire an event so that Repository will know to persist the new data to DB.
* successful update transaction from Repository will fire an event to inform Cache to update it local cache object.
* query for data should should try from Cache object first, if miss then call Repository to get data from DB.

#### Frontend solution:

