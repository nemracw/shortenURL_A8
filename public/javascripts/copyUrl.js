
const text = 'adc'

function myFunction() {
  /* Get the text field */
  var copyText = text

  /* Select the text field */
  copyText.select()

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value)

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value)
    
}
