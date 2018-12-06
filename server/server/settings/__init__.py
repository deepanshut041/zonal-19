from .prod import *

try:
    from .local import *
except:
    pass