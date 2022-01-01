// define sample function to randomly return an item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// define generatePath function
function generatePath(codeLength) {
  
  // define the letter/number might use
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to store things user picked up
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))

  // start generating path
  let path = ''
  for (let i = 0; i < codeLength; i++) {
    path += sample(collection)
  }

  // return the generated path
  return path
}

// export generatePath function for other files to use
module.exports = generatePath
