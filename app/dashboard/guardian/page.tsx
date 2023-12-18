import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import BarChart from '@/components/dashboard/guardian/BarChart'
import { Button } from '@/components/ui/button'
import {
  FaCalendarDays,
  FaBookOpen,
  FaTriangleExclamation,
  FaPhone,
  FaPenRuler
} from 'react-icons/fa6'

function DashboardPage (): React.ReactElement {
  return (
    <div className='flex bg-bg-200 flex-col w-full min-h-screen'>
      <header className='flex items-center h-16 px-4 border-b shrink-0 md:px-6'>
        <div className='flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4'>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <FaPenRuler className='w-6 h-6' />
            <span className='sr-only'>Customize Dashboard</span>
          </Button>
        </div>
      </header>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Attendance</CardTitle>
              <FaCalendarDays className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>85%</div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Attendance rate this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Academic Performance</CardTitle>
              <FaBookOpen className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>B+</div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Average grade this semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Behavior Reports</CardTitle>
              <FaTriangleExclamation className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>2</div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Incidents this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>School Announcements</CardTitle>
              <FaPhone className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>3</div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>New announcements this week</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance Statistics</CardTitle>
            </CardHeader>
            <CardContent className='mb-4 p-0'>
              <BarChart className='w-full aspect-[4/3]' />
            </CardContent>
          </Card>
          <Card className='mt-4'>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Event ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>EVT001</TableCell>
                    <TableCell>18/12/2023</TableCell>
                    <TableCell>School Fair</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>EVT002</TableCell>
                    <TableCell>20/12/2023</TableCell>
                    <TableCell>Christmas Play</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className='mt-4'>
            <CardHeader>
              <CardTitle>Recent Behavior Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Report ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Incident</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>REP001</TableCell>
                    <TableCell>12/12/2023</TableCell>
                    <TableCell>Disruptive in class</TableCell>
                    <TableCell className='text-right'>Resolved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>REP002</TableCell>
                    <TableCell>11/12/2023</TableCell>
                    <TableCell>Late to school</TableCell>
                    <TableCell className='text-right'>Unresolved</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage

// eslint-disable-next-line no-lone-blocks
{ /*
<header className='flex flex-col w-screen px-5 bg-bg-200 pb-10 items-center pt-28'>
  <div className='md:flex md: justify-between'>
    <UserTitle />
    <Image src={'/intro-dashboard.png'} alt='Dashboard Presentation' width={768} height={500} className='md:w-96' />
  </div>

  <div className='grid shadow-lg grid-cols-2 gap-2 p-2 mb-10 rounded-lg mt-10 bg-bg-100 w-full md:grid-cols-4 max-w-4xl'>
    {
      coursesIcons.map((course) => (
        <CourseIcon
          key={course.alt}
          image={course.image}
          alt={course.alt}
          href={course.href}
          buttonText={course.buttonText}
        />
      ))
    }
  </div>
</header>
<main className='bg-bg-200 w-screen'>
TODO: Add view of small part of the sections
</main>
*/ }
