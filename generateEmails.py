import random
import argparse

def validateArgs():
    parser = argparse.ArgumentParser(description="Quotify List")
    parser.add_argument(
        "--email",
        required=True,
        type=str,
        help="The prefix on the email. For example tyrel@giftbit.com, tyrel is the prefix.",
    )
    parser.add_argument(
        "--domain",
        required=True,
        type=str,
        help="Domain for the email address",
    )
    parser.add_argument(
        "--amount",
        required=False,
        type=int,
        help="Number of emails to generate. Default is 10 if amount excluded.",
    )
    parser.add_argument(
        "--newline",
        required=False,
        action="store_true",
        help='Delimiter you want between quoted line items. For example "\n"'
    )
    global args
    args = parser.parse_args()
    
    if not args.amount or args.amount < 0:
        args.amount = 10

def main():
    filename = "email_output_"+ str(args.amount) + "_" + str(random.randint(0, 999)) + ".csv"
    outputFile = open(filename, 'w')

    outputFile.write('"contacts": [' + "\n")

    for n in range(0, args.amount):
        outputFile.write(f'  {{ "email": "{args.email}+{str(n)}@{args.domain}" }},' + "\n")
    
    outputFile.write(']' + "\n")
    
    print(filename + " generated.")

if __name__ == '__main__':
    validateArgs()
    main()