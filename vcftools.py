


def process_vcf(vcffile):
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

        rslt.append(fields)
    print(rslt)






process_vcf('fullshloima.vcf')
process_vcf("contacts.vcf")
