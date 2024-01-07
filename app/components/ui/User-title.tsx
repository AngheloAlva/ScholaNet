function UserTitle ({ name }: { name: string }): React.ReactElement {
  return (
    <h1 className='text-5xl text-text-100 md:text-6xl font-bold'>
      Welcome {name}
    </h1>
  )
}

export default UserTitle
