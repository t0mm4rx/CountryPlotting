import json

believe = tuple(open('../data_raw/data_believe_raw.txt', 'r'))[1:]
hapiness = tuple(open('../data_raw/data_hapiness_raw.txt', 'r'))[1:]
countries = tuple(open('../data_raw/data_country_codes.txt', 'r'))[1:]

def hasNumbers(inputString):
    return any(char.isdigit() for char in inputString)

def str_to_int(s):
    s = s.replace('%', '')
    return float(s)

def get_code(c):
    for a in countries:
        if (c in a):
            return a.split(' ')[0].lower()


data_believe = []
for country in believe:
    data_believe.append({
        'country': country.split('\t')[0],
        'believe': str_to_int(country.split('\t')[1])
    })


data_hapiness = []
for country in hapiness:
    c = ""
    c += (country.split(' ')[0])
    a = 1
    while (not hasNumbers(country.split(' ')[a])):
        c += ' ' + (country.split(' ')[a])
        a += 1
    data_hapiness.append({
        'country': c,
        'happiness': float(country.split(' ')[a])
    })

final_dataset = []
errors = []

a = 0
for x in data_believe:
    f = False
    for y in data_hapiness:
        if (x['country'] == y['country']):
            final_dataset.append({
                'country': x['country'],
                'happiness': y['happiness'],
                'believe': x['believe'],
                'code': get_code(x['country'])
            })
            f = True
    if (f == False):
        errors.append(x['country'])

with open('dataset_happiness_believe.json', 'w+') as output:
    json.dump(final_dataset, output)
