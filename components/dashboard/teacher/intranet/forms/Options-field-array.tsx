import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function OptionsFieldArray (
  { questionIndex, setValue }: { questionIndex: number, setValue: any }
): React.ReactElement {
  const [options, setOptions] = useState<string[]>([])
  const [correctAnswer, setCorrectAnswer] = useState<string | null >(null)

  useEffect(() => {
    setValue(`questions.${questionIndex}.options`, options)
  }, [options, setValue, questionIndex])

  const onAddOption = (): void => {
    const newOptions = [...options, '']
    setOptions(newOptions)
  }

  const onRemoveOption = (index: number): void => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
  }

  const handleOptionChange = (index: number, value: string): void => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleCorrectAnswerChange = (value: string): void => {
    setCorrectAnswer(value)
    setValue(`questions.${questionIndex}.correctAnswer`, value)
  }

  return (
    <>
      {
        options.map((option, index) => (
          <div className='flex gap-4' key={index}>
            <Input
              className='w-3/4'
              value={option}
              placeholder='Option text'
              onChange={(e) => { handleOptionChange(index, e.target.value) }}
            />
            <Button
              type='button'
              variant={'destructive'}
              className='w-1/3 self-end'
              onClick={() => { onRemoveOption(index) }}
            >
              Remove option
            </Button>
            <Input
              type='radio'
              className='w-auto'
              value={option}
              checked={option === correctAnswer}
              onChange={() => { handleCorrectAnswerChange(option) }}
            />
          </div>
        ))
      }

      <Button
        type='button'
        variant={'secondary'}
        onClick={onAddOption}
      >
        Add option
      </Button>
    </>
  )
}

export default OptionsFieldArray
