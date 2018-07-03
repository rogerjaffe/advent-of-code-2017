from utilities import readFile
from string import split

data = readFile('data2.csv')
lines = split(data, '\n')

# Function that splits the line up into an array of items
# separated by tabs
def csvParse(line):
    return split(line, '\t')
    
# Apply the csvParse function to all the elements of the 
# lines array
linesOfTokens = map(csvParse, lines)
print (linesOfTokens)