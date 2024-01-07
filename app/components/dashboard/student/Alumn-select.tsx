function AlumnSelect (): React.ReactElement {
  return (
    <div className='grid grid-cols-2 gap-2 border-2 py-5 rounded-lg bg-bg-300 w-full'>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center w-24 h-24 bg-bg-200 rounded-full'>
          <img src='/alumn-1.png' alt='Alumn 1' />
        </div>
        <p className='text-xl font-bold mt-2'>Alumn 1</p>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center w-24 h-24 bg-bg-200 rounded-full'>
          <img src='/alumn-2.png' alt='Alumn 2' />
        </div>
        <p className='text-xl font-bold mt-2'>Alumn 2</p>
      </div>
    </div>
  )
}

export default AlumnSelect
