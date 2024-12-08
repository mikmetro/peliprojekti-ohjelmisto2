UPGRADE_BASE_VALUES: dict[str, dict[str, float | int]] = {
    "income":  {
        "price": 15000,          # Hinta
        "price_multiplier": 1.5, # Hinta kerroin per taso
        "effect_initial": 1.8,   # Vaikutuksen alku arvo
        "effect": 1.8,           # Vaikutuksen kerroin per taso
        "effect_step": 0.01,     # Numero tarkkuus (Tämä on olemassa, että pystyy näyttää tarkemman arvon frontendissä)
    },
    "co2decrease": {
        "price": 10000,
        "price_multiplier": 1.8,
        "effect_initial": 15,
        "effect": 1.5,
        "effect_step": 1
    },
    "security": {
        "price": 15000,
        "price_multiplier": 1.7,
        "effect_initial": 0.01,
        "effect": 2,
        "effect_step": 0.01
    },
}

def floor_by_step(value: float, step: float) -> float:
    return value - (value % step)

def ceil_by_step(value: float, step: float) -> float:
    return floor_by_step(value, step) + step

def get_upgrade_info(level: int, name: str) -> dict[str, float] | None:

    print("MISSING MAX UPGRADE LEVEL CHECKS") # HUOMAA TÄMÄ

    if name not in UPGRADE_BASE_VALUES:
        return None

    # tää kohta on sen takia, että koodia on helpompaa lukea. Ja joo tän ois voinu tehdä destructuraamal for loopin avulla, mut sit se ei tarkasta avainparien nimejä.
    price = UPGRADE_BASE_VALUES[name]["price"]
    price_multiplier = UPGRADE_BASE_VALUES[name]["price_multiplier"]
    effect_initial = UPGRADE_BASE_VALUES[name]["effect_initial"]
    effect = UPGRADE_BASE_VALUES[name]["effect"]
    effect_step = UPGRADE_BASE_VALUES[name]["effect_step"]

    level -= 1 # Muuten eksponentti on liian iso

    price = price * (price_multiplier ** level)
    effect = effect_initial * (effect ** level)

    price = ceil_by_step(price, 1000)
    effect = floor_by_step(effect, effect_step)

    return {
        "price": price,
        "effect": effect,
    }

def pre_calculate_upgrades():
    MAX_UPGRADE_LEVEL = 10

    result = {
        "income": [],
        "co2decrease": [],
        "security": []
    }

    for name in result:
        for level in range(0, MAX_UPGRADE_LEVEL + 1):
            result[name].append(get_upgrade_info(level, name))

    return result
