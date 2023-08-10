import sys
import os
import argparse

def validateArgs():
    parser = argparse.ArgumentParser(description="Quotify List")
    parser.add_argument(
        "--path",
        required=True,
        type=str,
        help="Path to the file you want to parse",
    )
    parser.add_argument(
        "--newline",
        required=False,
        action="store_true",
        help='Delimiter you want between quoted line items. For example "\n"'
    )
    global args
    args = parser.parse_args()

def main():
    filename = args.path

    if not len(filename.split(".")) == 2:
        print(f"cannot find file {filename}")
        sys.exit(1)

    if not os.path.isfile(filename):
        print(f"cannot find file {filename}")
        sys.exit(1)

    with open(filename, "r") as inputfile:
        print(f"reading file {filename}")
        inputlines = inputfile.readlines()
        print(f"read {len(inputlines)} lines from {filename}")

        print("generating output")
        if args.newline:
            print("separating results on new lines")
        output = ""
        for inputline in inputlines:
            output += f"\"{inputline.strip()}\","
            if args.newline:
                output += "\n"
        
        outputFileExtension = "" if len(filename.split(".")) <= 1 else f".{filename.split('.')[1]}"
        outputFileName = f"{filename.split('.')[0]}_commasepquotes{outputFileExtension}"

        if os.path.isfile(outputFileName):
            print(f"removing existing file {outputFileName}")
            os.remove(outputFileName)

        print(f"writing to file {outputFileName}")
        outputFile = open(outputFileName, 'w')
        outputFile.write(output)
        outputFile.close()

        print("complete.")

if __name__ == '__main__':
    validateArgs()
    main()