import os
from pathlib import Path
import importlib
import importlib.util

__all__ = [
    "ENV_CONFIG"
]

_BASE_DIR = Path(__file__).resolve().parent.parent
_CONFIG_DIR = Path(_BASE_DIR).joinpath("configs")

_DEFAULT_ENV = "dev"
_ENV = os.getenv('ENVIRONMENT', _DEFAULT_ENV)


def _module_from_file(module_name, file_path):
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


_ENV_CONFIG = None
if _ENV:
    _ENV_CONFIG = _module_from_file("wealook_env_config", f"{_CONFIG_DIR}/{_ENV}.py")
else:
    _ENV_CONFIG = importlib.import_module("default_settings", ".")


class _Config:
    def __getattr__(self, name):
        return getattr(_ENV_CONFIG, name)


ENV_CONFIG = _Config()
