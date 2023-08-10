import random
import sys

emailPrefix = "matt"
emailDomain = "giftbit.com"
numberOfEmails = 2000

# TODO: add args flag to output json or not

def main():
    filename = "output_"+ str(numberOfEmails) + "_" + str(random.randint(0, 999)) + ".csv"
    outputFile = open(filename, 'w')

    outputFile.write('"contacts": [' + "\n")

    for n in range(0, numberOfEmails):
        outputFile.write(f'  {{ "email": "{emailPrefix}+{str(n)}@{emailDomain}" }},' + "\n")
    
    outputFile.write(']' + "\n")
    
    print(filename + " generated.")

if __name__ == '__main__':
    main()