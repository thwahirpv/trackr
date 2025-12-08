import DashboardLayout from '../_components/DashboardLayout';
import JobForm from '../_components/JobForm';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const CreateJobPage = async () => {
  const session = await getSession();
  if(!session) redirect('/login');

  return (
    <DashboardLayout>
        <div className='max-w-4xl mx-auto'>
           <JobForm />
        </div>
    </DashboardLayout>
  )
}

export default CreateJobPage;
