from addrformatter import format_address
from time import sleep



def process_vcf(vcffile):
    failed = 0
    success = 0

    rslt = []
    with open(vcffile, 'rt', encoding='utf8') as f:
        contacts = [i for i in f.read().split("BEGIN")]

    for contact in contacts:
        fields = {}
        for line in contact.split("\n"):
            if line.startswith("N"):
                content = line.split(":")[1]
                content = content.split(";")
                lenn = len(content)
                if lenn:
                    if content[0]:
                        fields['Lastname'] = content[0]
                    lenn -= 1
                if lenn:
                    fields['Firstname'] = " ".join(content[1:]).strip()
            
            elif line.startswith('FN'):
                content = line.split(":")[1]
                fields['DisplayName'] = content

            elif line.startswith('TEL'):
                try:
                    type_of, number = line.split("=")[1].split(":")

                    if fields.get(type_of):
                        type_of = type_of+"2"

                    if number:
                        fields[type_of] = number

                except Exception as e:
                    type_of = 'CELL'
                    number = line.split(":")[1]

            elif line.startswith('ADR'):
                try:
                    addr = " ".join(list(filter(None, line.split(":")[1].split(";"))))
                    addr = format_address(addr)
                    print(addr)
                    if addr[-1] == 'USA' and len(addr) >= 3:
                        fields['City'] = addr[-3]
                        fields['Address'] = addr[-4]
                except Exception as e:
                    pass


        rslt.append(fields)
    return rslt

