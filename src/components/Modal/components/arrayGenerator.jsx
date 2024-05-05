import { useState } from 'react'
import PropTypes from 'prop-types'

import ApiRequest from '@/components/api'
import ToggleSwitch from '@/components/checkbox'
import ButtonGroup from '@/components/buttons'
import InputField from '@/components/inputs'
import MultiSelectDropdown from '@/components/multiSelectDropdown'

const ArrayGeneratorModal = ({ isOpen, data }) => {
    const initialState = {
        minValue: -100,
        maxValue: 1,
        arraySize: 1,
        countOfArray: 1,
        error: {
            minValue: '',
            maxValue: '',
            arraySize: '',
            countOfArray: ''
        },
        isLengthChecked: false,
        isCountChecked: false,
        isFloatChecked: false,
        selectedNumberOptions: [],
        selectedArrayOptions: [],
        selectedNumberType: []
    }

    const [minValue, setMinValue] = useState(initialState.minValue)
    const [maxValue, setMaxValue] = useState(initialState.maxValue)
    const [arraySize, setArraySize] = useState(initialState.arraySize)
    const [countOfArray, setCountOfArray] = useState(initialState.countOfArray)
    const [error, setError] = useState(initialState.error)
    const [isLengthChecked, setIsLengthChecked] = useState(
        initialState.isLengthChecked
    )
    const [isCountChecked, setIsCountChecked] = useState(
        initialState.isCountChecked
    )
    const [selectedNumberOptions, setSelectedNumberOptions] = useState(
        initialState.selectedNumberOptions
    )
    const [selectedArrayOptions, setSelectedArrayOptions] = useState(
        initialState.selectedArrayOptions
    )
    const [selectedNumberType, setSelectedNumberType] = useState(
        initialState.selectedNumberType
    )

    const handleIsLengthChecked = () => {
        setIsLengthChecked(!isLengthChecked)
    }

    const handleIsCountChecked = () => {
        setIsCountChecked(!isCountChecked)
    }

    const handleNumberOptionsChange = selectedNumberOptions => {
        setSelectedNumberOptions(selectedNumberOptions)
        // You can perform any additional logic here with the selected options
    }
    const handleArrayOptionsChange = selectedArrayOptions => {
        setSelectedArrayOptions(selectedArrayOptions)
        // You can perform any additional logic here with the selected options
    }
    const handleNumberTypeChange = selectedNumberType => {
        setSelectedNumberType(selectedNumberType)
        // You can perform any additional logic here with the selected options
    }

    const handleChange = (value, setter, setErrorForValue, errorMessageFn) => {
        const numericValue = parseInt(value, 10)
        setter(numericValue)
        if (value === '') {
            setErrorForValue('Value is required')
        } else {
            const parsedValue = parseInt(value)
            if (!isNaN(parsedValue)) {
                if (Math.abs(parsedValue) > 100000) {
                    setErrorForValue('Value cannot exceed 100,000')
                } else {
                    const errorMessage = errorMessageFn(parsedValue)
                    setErrorForValue(errorMessage || '') // Set error message to empty string if valid
                }
            } else {
                setErrorForValue('Please enter a valid integer')
            }
        }
    }

    const handleMinValueChange = e =>
        handleChange(
            e.target.value.trim(),
            setMinValue,
            errorMessage => setError({ ...error, minValue: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value > maxValue
                      ? 'Min value must be less than or equal to max value'
                      : ''
        )

    const handleMaxValueChange = e =>
        handleChange(
            e.target.value.trim(),
            setMaxValue,
            errorMessage => setError({ ...error, maxValue: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value < minValue
                      ? 'Max value must be greater than or equal to min value'
                      : ''
        )

    const handleArraySizeChange = e => {
        handleChange(
            e.target.value.trim(),
            setArraySize,
            errorMessage =>
                setError({ ...error, integersLength: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Length must be greater than 0'
                      : value > 100000
                        ? 'Length must not exceed 100,000'
                        : null
        )
    }

    const handleCountOfArrayChange = e =>
        handleChange(
            e.target.value.trim(),
            setCountOfArray,
            errorMessage => setError({ ...error, countOfArray: errorMessage }),
            value =>
                value === ''
                    ? ''
                    : value <= 0
                      ? 'Count must be greater than 0'
                      : value > 100000
                        ? 'Count must not exceed 100,000'
                        : null
        )

    const type = data.title
    const payloadData = {
        min_value: minValue,
        max_value: maxValue,
        desired_length: arraySize,
        count: countOfArray,
        show_length: isLengthChecked,
        show_count: isCountChecked,
        number_options: selectedNumberOptions,
        array_options: selectedArrayOptions,
        number_type: selectedNumberType,
        type: type
    }


    const handleGenerate = async () => {
        const setGeneratedData = data => {
            // Implement the logic to set the generated data
            console.log('Setting generated data:', data)
        }

        try {
            const responseData = await ApiRequest(
                `generate${type}`, // Use capitalizedValue in the request
                'POST',
                payloadData
            )

            // Handle the response data as needed
            console.log(`Received data for ${type}:`, responseData)
            setGeneratedData(responseData)
        } catch (error) {
            // Error handling
            console.error(`Error fetching data:`, error)
        }
    }

    const handleCopy = () => {
        // your handleCopy function logic
    }

    const handleReset = () => {
        // Implement reset functionality here for array generator
        setMinValue(initialState.minValue)
        setMaxValue(initialState.maxValue)
        setArraySize(initialState.arraySize)
        setCountOfArray(initialState.countOfArray)
        setError(initialState.error)
        setIsLengthChecked(initialState.isLengthChecked)
        setIsCountChecked(initialState.isCountChecked)
        setSelectedNumberOptions(initialState.selectedNumberOptions)
        setSelectedArrayOptions(initialState.selectedArrayOptions)
        setSelectedNumberType(initialState.selectedNumberType)
    }

    const handleDownload = () => {
        // your handleDownload function logic
    }

    const handleSendToEmail = () => {
        // your handleSendToEmail function logic
    }

    const hasErrors = Object.values(error).some(
        errorMessage => errorMessage !== ''
    )

    if (!isOpen) return null

    const buttons = [
        {
            label: 'Generate',
            onClick: handleGenerate,
            disabled: hasErrors,
            classNames: `hover:bg-blue-700 hover:text-white border-blue-600 border-2 ${hasErrors ? 'cursor-not-allowed bg-gray-300 border-gray-400 text-gray-600' : 'hover:bg-blue-700'}`
        },
        {
            label: 'Copy',
            onClick: handleCopy,
            classNames: `hover:bg-purple-700 hover:text-white border-purple-600 border-2`
        },
        {
            label: 'Reset',
            onClick: handleReset,
            classNames: `hover:bg-red-700 hover:text-white border-red-600 border-2`
        },
        {
            label: 'Download',
            onClick: handleDownload,
            classNames: `hover:bg-orange-700 hover:text-white border-orange-600 border-2`
        },
        {
            label: 'Send to Email',
            onClick: handleSendToEmail,
            classNames: `hover:bg-green-700 hover:text-white border-green-600 border-2`
        }
    ]

    const numberOptions = ['Any', 'Even', 'Odd', 'Prime']
    const arrayOptions = ['Random Size', 'Float Value', 'Distinct', 'Negative']
    const numberType = ['Increasing', 'Decreasing', 'Random']

    return (
        <div className='modal'>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                <InputField
                    label='Min value'
                    value={minValue}
                    onChange={handleMinValueChange}
                    placeholder='Minimum'
                    error={error.minValue}
                    isRequired={true}
                />
                <InputField
                    label='Max Value'
                    value={maxValue}
                    onChange={handleMaxValueChange}
                    placeholder='Maximum'
                    error={error.maxValue}
                    isRequired={true}
                />
                <InputField
                    label="Array's Size"
                    value={arraySize}
                    onChange={handleArraySizeChange}
                    placeholder='Size'
                    error={error.integersLength}
                    isRequired={true}
                />
                <InputField
                    label='Count of Arrays'
                    value={countOfArray}
                    onChange={handleCountOfArrayChange}
                    placeholder='Count'
                    error={error.countOfArray}
                    isRequired={true}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <ToggleSwitch
                    checked={isCountChecked}
                    onChange={handleIsCountChecked}
                    rightLabel='Show length'
                />
                <ToggleSwitch
                    checked={isLengthChecked}
                    onChange={handleIsLengthChecked}
                    rightLabel='Show count'
                />
            </div>
            <div className='grid sm:grid-cols-3 text-sm font-sm'>
                <MultiSelectDropdown
                    heading='Select Number Options'
                    options={numberOptions}
                    onChange={handleNumberOptionsChange}
                    value={selectedNumberOptions}
                />
                <MultiSelectDropdown
                    heading='Select Array type'
                    options={arrayOptions}
                    onChange={handleArrayOptionsChange}
                    value={selectedArrayOptions}
                />
                <MultiSelectDropdown
                    heading='Select Number type'
                    options={numberType}
                    onChange={handleNumberTypeChange}
                    value={selectedNumberType}
                />
            </div>

            <div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    )
}

ArrayGeneratorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
}

export default ArrayGeneratorModal
