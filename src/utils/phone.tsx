// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const phone = (phoneInputs) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const getInputNumbersValue = function (input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, '')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onPhonePaste = function (e) {
    const input = e.target,
      inputNumbersValue = getInputNumbersValue(input)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pasted = e.clipboardData || window.clipboardData
    if (pasted) {
      const pastedText = pasted.getData('Text')
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue
        return
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onPhoneInput = function (e) {
    // eslint-disable-next-line prefer-const
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      // eslint-disable-next-line prefer-const
      selectionStart = input.selectionStart,
      formattedInputValue = ''

    if (!inputNumbersValue) {
      return (input.value = '')
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue
      }
      return
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == '9')
        inputNumbersValue = '7' + inputNumbersValue
      const firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7'
      formattedInputValue = input.value = firstSymbols + ' '
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16)
    }
    input.value = formattedInputValue
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onPhoneKeyDown = function (e) {
    // Clear input after remove last symbol
    const inputValue = e.target.value.replace(/\D/g, '')
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = ''
    }
  }
  for (const phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown)
    phoneInput.addEventListener('input', onPhoneInput, false)
    phoneInput.addEventListener('paste', onPhonePaste, false)
  }
}
