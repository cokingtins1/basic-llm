def custom_greeting(name:str) -> str:
    """A simple function that returns a custom greeting"""
    return f"Hello, {name}! This greeting is generated in Python"

def capitalize_alternate(string: str) -> str:
    result = []

    for i, char in enumerate(string):
        if i % 2 == 0:
            result.append(char.upper())
        else:
            result.append(char.lower())
    return ''.join(result)