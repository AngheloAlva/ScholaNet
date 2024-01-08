'use client'

import EditEvaluationForm from '@/app/components/dashboard/teacher/intranet/forms/Edit-evaluation-form'
import { Skeleton } from '@/app/components/ui/skeleton'
import useEvaluationById from '@/app/hooks/useEvaluationById'

function EvaluationByIdPage (
  { params }: { params: { teacherId: string, courseId: string, evaluationId: string } }
): React.ReactElement {
  const { evaluation, questions, reloadData } = useEvaluationById(params.evaluationId)

  // {
  //   _id: '6599720fc79eb13c90802428',
  //   title: 'Title example',
  //   description: 'This is a examn of Physical education',
  //   courseInstance: {
  //     attendances: [],
  //     evaluations: [],
  //     _id: '658894bad39bc1c5fac5567c',
  //     course: '658493e32be63c7b44311408',
  //     teacher: '65746b98a898c3733da001ee',
  //     students: [],
  //     semester: '6584ccd2f7a90bcba681d652',
  //     academicYear: '2024',
  //     classroom: 'Classroom 3, floor 1',
  //     schedule: '6595d1bcc579d7bb35e203e1',
  //     __v: 3
  //   },
  //   dueDate: '2024-01-06T03:00:00.000Z',
  //   type: 'online',
  //   questions: [],
  //   submissions: [],
  //   __v: 0
  // }

  // [
  //   {
  //     _id: '659a048a79e35e7831bbd77b',
  //     questionText: 'Example question number three',
  //     options: [ 'True', 'False' ],
  //     correctAnswer: 'True',
  //     points: 15,
  //     questionType: 'trueFalse',
  //     evaluation: '65999c6bc79eb13c908024d2',
  //     __v: 0
  //   },
  //   {
  //     _id: '659a048a79e35e7831bbd779',
  //     questionText: 'Example question',
  //     options: [ 'Option 1', 'Option number 2', 'Option three' ],
  //     correctAnswer: 'Option number 2',
  //     points: 10,
  //     questionType: 'multipleChoice',
  //     evaluation: '65999c6bc79eb13c908024d2',
  //     __v: 0
  //   },
  //   {
  //     _id: '659a048a79e35e7831bbd77a',
  //     questionText: 'Example question number 2',
  //     options: [ 'This is a short answer of question number two' ],
  //     correctAnswer: 'This is a short answer of question number two',
  //     points: 5,
  //     questionType: 'shortAnswer',
  //     evaluation: '65999c6bc79eb13c908024d2',
  //     __v: 0
  //   }
  // ]

  return (
    <main className='px-5 mb-20 py-8'>
      {
        (evaluation != null && questions != null)
          ? (
            <>
              <h1 className='text-2xl font-semibold mb-4'>Evaluation {evaluation.title}</h1>
              <EditEvaluationForm evaluation={evaluation} questions={questions} reloadData={reloadData} />
            </>
            )
          : <Skeleton className='w-full h-80' />
      }
    </main>
  )
}

export default EvaluationByIdPage
