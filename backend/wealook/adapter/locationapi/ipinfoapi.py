import ipinfo
from backend_settings.environment_settings import ENV_CONFIG

__all__ = [
    "IpInfoIO"
]


# The api itself already cached
class _IpInfoIO:
    def __init__(self, access_token=''):
        if not access_token and hasattr(ENV_CONFIG, "IPINFO_API_KEY"):
            access_token = ENV_CONFIG.IPINFO_API_KEY
        self.access_token = access_token

        self.handler = ipinfo.Handler(
            access_token=self.access_token,
            cache_options={  # explicit default
                'ttl': 24 * 60 * 60,
                'maxsize': 4096,
            }
        )

    def _getIpDetails(self, ip):
        return self.handler.getDetails(ip)

    def get_ip_city(self, ip):
        details = self._getIpDetails(ip)
        if not hasattr(details, 'city'): # TODO: proper mock
            return 'Tokyo'
        return details.city

    # ISO2
    def get_ip_country(self, ip):
        details = self._getIpDetails(ip)
        return details.country

    def get_ip_loc(self, ip):
        details = self._getIpDetails(ip)
        loc = details.loc
        loc = loc.split(",")
        return float(loc[0].strip()), float(loc[1].strip())


IpInfoIO = _IpInfoIO()
