/* eslint-disable @typescript-eslint/no-misused-promises */

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'

import { Form } from './ui/form'

import type { AuthFormFieldProps } from '@/components/Form-field'

interface GenericFormProps {
  schema: any
  defaultValues: any
  children: React.ReactNode
  onSubmit: any
}

function GenericForm ({
  schema, defaultValues, children, onSubmit
}: GenericFormProps): React.ReactElement {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {
          React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(
                (child as React.ReactElement<AuthFormFieldProps>),
                { control: form.control }
              )
            }
          })
        }
      </form>
    </Form>
  )
}

export default GenericForm
