import { getQuestionsByEvaluation } from '@/api/course/question'
import { getEvaluation } from '@/api/course/evaluation'
import { useEffect, useState } from 'react'

import { useToast } from '../components/ui/use-toast'

import type { Evaluation } from '@/types/course/evaluation'
import type { Question } from '@/types/course/question'

const useEvaluationById = (id: string): {
  evaluation: Evaluation | null
  isLoading: boolean
  questions: Question[]
  reloadQuestions: () => Promise<void>
  reloadEvaluation: () => Promise<void>
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

        const questionRes = await getQuestionsByEvaluation(id)
        setQuestions(questionRes.questions)
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

  const reloadQuestions = async (): Promise<void> => {
    try {
      const questionRes = await getQuestionsByEvaluation(id)
      setQuestions(questionRes.questions)
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

  const reloadEvaluation = async (): Promise<void> => {
    try {
      const response = await getEvaluation(id)
      setEvaluation(response)
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
    reloadQuestions,
    reloadEvaluation
  }
}

export default useEvaluationById
