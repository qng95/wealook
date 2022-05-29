class Country:
    def __init__(self, **kwargs):
        self.name = None
        self.iso3 = None
        self.iso2 = None
        self.regions = None

        if 'name' in kwargs:
            self.name = kwargs['name']

        if 'iso3' in kwargs:
            self.iso3 = kwargs['iso3']

        if 'iso2' in kwargs:
            self.iso2 = kwargs['iso2']

        if 'regions' in kwargs:
            self.regions = kwargs['regions']
