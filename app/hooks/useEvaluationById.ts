import { getEvaluation } from '@/api/course/evaluation'
import { useToast } from '../components/ui/use-toast'
import { useEffect, useState } from 'react'

import type { Evaluation } from '@/types/course/evaluation'
import type { Question } from '@/types/course/question'
import { getQuestionById } from '@/api/course/question'

const useEvaluationById = (id: string): {
  evaluation: Evaluation | null
  isLoading: boolean
  questions: Question[]
  reloadData: () => Promise<void>
} => {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEvaluation = async (): Promise<void> => {
      try {
        const response = await getEvaluation(id)
        setEvaluation(response)

        await Promise.all(response.questions.map(async (question) => {
          const questionRes = await getQuestionById(question)
          setQuestions((prev) => [...prev, questionRes])
        }))
      } catch (error) {
        toast({
          title: 'Error',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 2000
        })
      } finally {
        setIsLoading(false)
      }
    }

    void fetchEvaluation()
  }, [id])

  const reloadData = async (): Promise<void> => {
    try {
      const response = await getEvaluation(id)
      setEvaluation(response)

      await Promise.all(response.questions.map(async (question) => {
        const questionRes = await getQuestionById(question)
        setQuestions((prev) => [...prev, questionRes])
      }))
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 2000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    evaluation,
    isLoading,
    questions,
    reloadData
  }
}

export default useEvaluationById
