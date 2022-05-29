SECRET_KEY = 'django-insecure-zi74$!olem3fisb+%j0!umh#=rcwbyefp48r=6=7i%%0!1&!yl'
DEBUG = True
ALLOWED_HOSTS = []
ROOT_URLCONF = 'backend_settings.urls'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'wealook_app',
        'OPTIONS': {
            'options': '-c search_path=muller_travel,public'
        },
        'USER': 'wealook_user',
        'PASSWORD': '22082105',
        'HOST': '34.159.134.154',
        'PORT': '5432',
    }
}
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = [
    # DEV servers
    'http://localhost:8000',
    'http://localhost:3000',
    'http://localhost:8081',
]
STATIC_URL = 'static/'

IPINFO_API_KEY = ""
OPENWEATHER_API_KEY = "a411d702d383f7a96737f5e72009ad86"
