import sys

def txt_to_json(file):
    """
    Takes a list of words in a text file
    Returns a valind json file with words in an array
    """

    # accept only files that end in .txt
    if file[-4:] != '.txt':
        raise Exception('File must be a .txt')

    result = '{ "words": ['
    words = open('./words.txt', 'r').read().split('\n')

    # get rid of any words with no values
    words = [word for word in words if len(word) != 0]

    # write the JSON string
    i = 0
    for word in words:
        result += '"' + word + '"'
        if i != len(words) - 1:
            result += ','
        i += 1
    
    result += "]}"
    return result

def create_json(string):
    """
    Take a JSON string and make a .JSON file
    """
    file = open('words.json', 'w')
    file.write(string)
    file.close()

if __name__ == '__main__':
    json = txt_to_json(sys.argv[1])
    create_json(json)
    sys.exit(0)